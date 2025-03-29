import TryCatch from "../utils/TryCatch.js";
import { JobRecruiter } from "../models/jobrecruiterModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import cloudinary from 'cloudinary'
import getDataUrl from "../utils/urlGenerator.js";
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const TEMP_USERS = {};

export const registerWithOtp = TryCatch(async (req, res) => {
  const { companyName, email, password, phone, website, industry, location } = req.body;
 



  if (Array.isArray(email) || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const existingRecruiter = await JobRecruiter.findOne({ email });
  if (existingRecruiter) {
    return res.status(400).json({ message: "An account with this email already exists" });
  }

  const otp = crypto.randomInt(100000, 999999);
  console.log("OTP:", otp);

  TEMP_USERS[email] = {
    companyName,
    password,
    phone,
    website,
    industry,
    location,
    otp,
  
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.MY_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    const token = jwt.sign({ email }, process.env.JWT_SEC, { expiresIn: "5m" });

    res.status(200).json({
      message: "OTP sent successfully. Please verify to complete registration.",
      token,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

export const verifyOtpAndRegisterRecruiter = TryCatch(async (req, res) => {
  const { otp } = req.body;
  const { token } = req.params;

  if (!otp || !token) {
    return res.status(400).json({ message: "OTP and token are required" });
  }

  try {
    const { email } = jwt.verify(token, process.env.JWT_SEC);
    const tempUser = TEMP_USERS[email];

    // If no tempUser, return error
    if (!tempUser) {
      return res.status(400).json({ message: "No OTP request found for this email" });
    }

    // If tempUser exists but has no password
    if (!tempUser.password) {
      return res.status(400).json({ message: "Password is missing. Please restart the registration process." });
    }

    // Check OTP Expiry
    if (tempUser.expiresAt < Date.now()) {
      delete TEMP_USERS[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    // Check if OTP is correct
    if (parseInt(tempUser.otp) !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Hash the password
    const hashPassword = await bcrypt.hash(tempUser.password, 10);

    // ✅ Create Recruiter
    const recruiter = await JobRecruiter.create({
      companyName: tempUser.companyName,
      email,
      password: hashPassword,
      phone: tempUser.phone,
      website: tempUser.website,
      industry: tempUser.industry,
      location: tempUser.location,
    });

    // Remove temp user from memory
    delete TEMP_USERS[email];

    

    res.status(201).json({ recruiter, message: "Recruiter registered successfully wait for admin approval" });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
});


export const loginRecruiter = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const recruiter = await JobRecruiter.findOne({ email });

  if (!recruiter) {
    return res.status(400).json({ message: "Email or Password Incorrect." });
  }

  if(!recruiter.isVerifiedByAdmin)
    return res.status(400).json({ message: "You are not verified by Admin." });

  const comparePassword = await bcrypt.compare(password, recruiter.password);
  if (!comparePassword) {
    return res.status(400).json({ message: "Email or Password Incorrect." });
  }

  generateToken(recruiter, res);

  res.json({ recruiter, message: "Logged In" });
});

export const forgetPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  if (Array.isArray(email) || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const recruiter = await JobRecruiter.findOne({ email });
  if (!recruiter) {
    return res.status(400).json({ message: "No recruiter found" });
  }

  const otp = crypto.randomInt(100000, 999999);
  TEMP_USERS[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.MY_PASS,
    },
  });

  console.log("OTP:", otp);

  try {
    await transporter.sendMail({
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    const token = jwt.sign({ email }, process.env.JWT_SEC, { expiresIn: "5m" });

    res.status(200).json({ message: "OTP sent successfully.", token });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

export const resetPassword = TryCatch(async (req, res) => {
  const { token } = req.params;
  const { otp, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!otp || !token) {
    return res.status(400).json({ message: "OTP and token are required" });
  }

  let email;
  try {
    ({ email } = jwt.verify(token, process.env.JWT_SEC));
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const tempUser = TEMP_USERS[email];
  if (!tempUser) {
    return res.status(400).json({ message: "No OTP request found for this email" });
  }

  if (tempUser.expiresAt < Date.now()) {
    delete TEMP_USERS[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (tempUser.otp.toString() !== otp.toString()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const recruiter = await JobRecruiter.findOne({ email });
  if (!recruiter) {
    return res.status(404).json({ message: "Recruiter not found" });
  }

  recruiter.password = await bcrypt.hash(password, 10);
  await recruiter.save();

  delete TEMP_USERS[email];
  res.json({ message: "Password reset successful" });
});

export const recruiterProfile = TryCatch(async (req, res) => {
  const recruiter = await JobRecruiter.findById(req.user._id);
  res.json(recruiter);
});


export const logoutRecruiter = TryCatch(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Recruiter Logged out" });
});
