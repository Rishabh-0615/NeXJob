import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import validator from 'validator';
import { Admin } from "../models/adminModel.js";
import { JobRecruiter } from "../models/jobrecruiterModel.js";
dotenv.config();




export const defaultAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Default admin created");
  }
};

export const  adminLogin = TryCatch(async(req, res) => {
  const { email, password } = req.body;
  console.log(email)

  const user = await Admin.findOne({email})
  if (!user) {
    return res.status(404).json({ message: "Admin not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      
      message: "Incorrect username or password." ,
    

    });
  } 

  generateToken(user,res);
  return res.json({
    user,
    message: "Admin login successful",
  });

});

export const meadmin = TryCatch(async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export const getUnverifiedRecruiters = TryCatch(async (req, res) => {
  try {
    const unverifiedRecruiters = await JobRecruiter.find({ isVerifiedByAdmin: false });

    if (unverifiedRecruiters.length === 0) {
      console.log("No unverified recruiters found.");
      return res.status(200).json({ recruiters: [] }); 
    }

    console.log("Unverified Recruiters:", unverifiedRecruiters);
    res.status(200).json({ recruiters: unverifiedRecruiters }); 

  } catch (error) {
    console.error("Error fetching unverified recruiters:", error);
    res.status(500).json({ message: "Server error fetching unverified recruiters" });
  }
});


 


export const verifyRecruiter = TryCatch(async (req, res) => {

  try {
    const { userId } = req.params;
    const recruiter = await JobRecruiter.findById(userId);

    if(!recruiter)
        return res.status(404).json({ message: "Recruiter not found" });
    if (recruiter.isVerifiedByAdmin) {
        return res.status(400).json({ message: "Recruiter already verified" });
        }
    recruiter.isVerifiedByAdmin = true;
    await recruiter.save();
   
    res.status(200).json({ message: "Recruiter verified successfully and email sent" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});