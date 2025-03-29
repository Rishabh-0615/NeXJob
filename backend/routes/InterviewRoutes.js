import express from "express";
import { Interview } from "../models/Interview.js";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../middlewares/isAuth.js"; // Assuming you have an auth middleware to check if the user is authenticated
const router = express.Router();


router.post("/schedule-interview", isAuth, async (req, res) => {
  try {
    console.log("🔍 Request Body:", req.body);
    console.log("🔍 Authenticated User:", req.user);

    
    const recruiterId = req.user?._id; // Make sure user is authenticated

    if (!recruiterId) {
      return res.status(401).json({ error: "Unauthorized. Recruiter ID is missing." });
    }

    

    

    const interviewId = uuidv4();
    const interviewLink = `http://localhost:5174/interview/${interviewId}`;

    const newInterview = new Interview({
      
      recruiterId,
      interviewId,
      interviewLink,
      status: "Scheduled",
    });

    await newInterview.save();
    res.json({ success: true, interviewLink });

  } catch (error) {
    console.error("❌ Error scheduling interview:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default router;