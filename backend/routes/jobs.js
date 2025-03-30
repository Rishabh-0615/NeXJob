import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// Get all job listings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
