import {JobRecruiter} from "../models/jobRecruiterModel.js";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import validator from 'validator';
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
const TEMP_RECRUITERS = {};

const isWorkEmail = (email) => {
    const personalDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const domain = email.split("@")[1];
    return domain && !personalDomains.includes(domain);
};

export const registerRecruiterWithOtp = TryCatch(async (req, res) => {
    const { companyName, email, password, phone, website, industry, location } = req.body;

    if (!companyName || !email || !password || !phone || !industry || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email) || !isWorkEmail(email)) {
        return res.status(400).json({ message: "Please use a valid work email" });
    }

    const existingRecruiter = await JobRecruiter.findOne({ email });
    if (existingRecruiter) {
        return res.status(400).json({ message: "An account with this email already exists" });
    }

    const otp = crypto.randomInt(100000, 999999);
    console.log("Generated OTP:", otp);
    TEMP_RECRUITERS[email] = {
        companyName, password, phone, website, industry, location, otp,
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
            subject: "Your OTP Code for Job Recruiter Registration",
            text: `Your OTP is: ${otp}`,
        });

        const token = jwt.sign({ email }, process.env.JWT_SEC, { expiresIn: "5m" });
        res.status(200).json({ message: "OTP sent successfully. Verify to complete registration.", token });
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
        const tempRecruiter = TEMP_RECRUITERS[email];

        if (!tempRecruiter) {
            return res.status(400).json({ message: "No OTP request found for this email" });
        }

        if (tempRecruiter.expiresAt < Date.now()) {
            delete TEMP_RECRUITERS[email];
            return res.status(400).json({ message: "OTP expired" });
        }

        if (parseInt(tempRecruiter.otp) !== parseInt(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const hashPassword = await bcrypt.hash(tempRecruiter.password, 10);
        const recruiter = await JobRecruiter.create({
            companyName: tempRecruiter.companyName,
            email,
            password: hashPassword,
            phone: tempRecruiter.phone,
            website: tempRecruiter.website,
            industry: tempRecruiter.industry,
            location: tempRecruiter.location,
        });

        delete TEMP_RECRUITERS[email];
        generateToken(recruiter, res);
        res.status(201).json({ recruiter, message: "Recruiter registered successfully" });
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
});

export const loginRecruiter = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const recruiter = await JobRecruiter.findOne({ email });

    if (!recruiter || !(await bcrypt.compare(password, recruiter.password))) {
        return res.status(400).json({ message: "Email or Password Incorrect." });
    }

    generateToken(recruiter, res);
    res.json({ recruiter, message: "Logged In" });
});





