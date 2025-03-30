import express from "express";
import { Interview } from "../models/Interview.js";
import { Application } from "../models/applicationModel.js"; // Import Application model
import {User} from "../models/jobseekerModel.js"
import { JobPost } from "../models/jobPostModel.js";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../middlewares/isAuth.js";
import nodemailer from 'nodemailer'
const router = express.Router();

router.post("/schedule-interview", isAuth, async (req, res) => {
  try {
    console.log("🔍 Request Body:", req.body);
    console.log("🔍 Authenticated User:", req.user);

    const { candidateId, jobId, applicationId } = req.body;
    const recruiterId = req.user?._id;

    if (!recruiterId) {
      return res.status(401).json({ error: "Unauthorized. Recruiter ID is missing." });
    }

    if (!candidateId || !jobId || !applicationId) {
      return res.status(400).json({ error: "Missing required fields: candidateId, jobId, or applicationId" });
    }

    // Create unique interview ID and link
    const interviewId = uuidv4();
    const interviewLink = `http://localhost:5173/interview/${interviewId}`;

    // Create new interview record
    const newInterview = new Interview({
      candidateId,
      recruiterId,
      jobId,
      interviewId,
      interviewLink,
      status: "Scheduled",
    });

    await newInterview.save();

    // Update application status
    await Application.findByIdAndUpdate(applicationId, {
      status: "Interview",
      interviewLink: interviewLink,
    });

    // Get candidate email
    const candidate = await User.findById(candidateId);
    const job = await JobPost.findById(jobId);

    if (candidate && candidate.email) {
      // Set up email transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // or your preferred email service
        auth: {
          user: process.env.MY_GMAIL,
          pass: process.env.MY_PASS,
        },
      });

      // Send email notification to the candidate
      await transporter.sendMail({
        from: process.env.MY_GMAIL,
        to: candidate.email,
        subject: `Interview Scheduled for ${job.title} position`,
        html: `
          <h1>Interview Scheduled</h1>
          <p>Dear ${candidate.name},</p>
          <p>You have been selected for an interview for the ${job.title} position.</p>
          <p>Please join the interview at the scheduled time using the link below:</p>
          <p><a href="${interviewLink}" target="_blank">Join Interview</a></p>
          <p>Interview ID: ${interviewId}</p>
          <p>If you have any questions, please contact us.</p>
          <p>Best regards,<br>Recruitment Team</p>
        `,
      });
    }

    res.json({
      success: true,
      interviewLink,
      message: "Interview scheduled successfully, email sent to candidate."
    });

  } catch (error) {
    console.error("❌ Error scheduling interview:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Add to your InterviewRoutes.js
router.get("/details/:interviewId", isAuth, async (req, res) => {
  try {
    const { interviewId } = req.params;
    const interview = await Interview.findOne({ interviewId })
      .populate('candidateId', 'name email')
      .populate('recruiterId', 'name')
      .populate('jobId', 'title company');
      
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    
    res.json({
      jobTitle: interview.jobId?.title || "Unknown Position",
      candidateName: interview.candidateId?.name || "Unknown Candidate",
      recruiterName: interview.recruiterId?.name || "Unknown Recruiter",
      status: interview.status
    });
  } catch (error) {
    console.error("Error fetching interview details:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all interviews for a recruiter
router.get("/recruiter-interviews", isAuth, async (req, res) => {
  try {
    const recruiterId = req.user?._id;
    
    if (!recruiterId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const interviews = await Interview.find({ recruiterId })
      .populate('candidateId', 'name email')
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });
      
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all interviews for a candidate
router.get("/candidate-interviews", isAuth, async (req, res) => {
  try {
    const candidateId = req.user?._id;
    
    if (!candidateId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const interviews = await Interview.find({ candidateId })
      .populate('recruiterId', 'name company')
      .populate('jobId', 'title company')
      .sort({ createdAt: -1 });
      
    res.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update interview status
router.put("/update-status/:interviewId", isAuth, async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { status } = req.body;
    
    if (!status || !['Scheduled', 'Completed'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    
    const interview = await Interview.findOneAndUpdate(
      { interviewId },
      { status },
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    
    res.json(interview);
  } catch (error) {
    console.error("Error updating interview status:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;