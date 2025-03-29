import { JobPost } from "../models/jobPostModel.js";
import { Application } from "../models/applicationModel.js";
import { JobRecruiter } from "../models/jobrecruiterModel.js";
import { User } from "../models/jobseekerModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js"; 
import cloudinary from "cloudinary";
import uploadFile from "../middlewares/multer.js";
import axios from 'axios'

import uploadResume from "../middlewares/multer2.js";
import uploadToCloudinary from "../utils/cloudinary.js";

const ATS_API_KEY = "Q9J56bQdnqNOXSK4uSG6nv2AOBQgePo4";

export const applyForJob = [
  uploadResume,
  TryCatch(async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Check if job post exists
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    let resumeUrl = null;
    let coverLetterUrl = null;
    let atsScore = 0; // Default ATS score

    console.log("Received files:", req.files); // Debugging log

    // Upload Resume to Cloudinary
    if (req.files?.resume) {
      resumeUrl = await uploadToCloudinary(req.files.resume[0].buffer, `resume_${userId}`);
    } else {
      return res.status(400).json({ message: "Resume is required" });
    }

    // Upload Cover Letter to Cloudinary (Optional)
    if (req.files?.coverLetter) {
      coverLetterUrl = await uploadToCloudinary(req.files.coverLetter[0].buffer, `coverLetter_${userId}`);
    }

    // 🟢 Try getting ATS Score (without failing the application)
    try {
      const atsResponse = await axios.post(
        "https://ats-score-checker-api.com/calculate",
        {
          jobTitle: job.title,
          jobDescription: job.description,
          skillsRequired: job.skills,
          resume: resumeUrl,
        },
        {
          headers: { Authorization: `Bearer ${ATS_API_KEY}` },
        }
      );
      atsScore = atsResponse.data.score || 0;
    } catch (error) {
      console.warn("ATS API failed:", error.message); // Logs error but continues execution
    }

    // Create Application Entry
    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumeUrl,
      coverLetter: coverLetterUrl,
      atsScore,
    });

    res.status(201).json({ application, message: "Job application submitted successfully" });
  }),
];


export const getApplications = TryCatch(async (req, res) => {
  const userId = req.user._id;
  const applications = await Application.find({ applicant: userId })
    .populate("job", "title description company")
    .populate("applicant", "name email")
    .sort({ appliedAt: -1 });

  if (!applications.length) {
    return res.status(404).json({ message: "No applications found" });
  }

  res.status(200).json(applications);
});

export const getApplicationById = TryCatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const application = await Application.findById(id)
    .populate("job", "title description company")
    .populate("applicant", "name email");

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }
  console.log(application.applicant.id,userId)

  if (application.applicant.id.toString() !== userId.toString()) {
    return res.status(403).json({ message: "You are not authorized to view this application" });
  }

  res.status(200).json({application});
});

export const withdrawApplication = TryCatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const application = await Application.findOneAndDelete({ _id: id, applicant: userId });

  if (!application) {
    return res.status(404).json({ message: "Application not found or already withdrawn" });
  }

  res.status(200).json({ message: "Application withdrawn successfully" });
});

export const getAllJobApplications = TryCatch(async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const jobs = await JobPost.find({ company: recruiterId });

    if (!jobs.length) {
      return res.status(404).json({ message: "No job posts found for this recruiter" });
    }

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("applicant", "name email phone")
      .populate("job", "title description company")
      .sort({ appliedAt: -1 });

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for the posted jobs" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export const getJobApplications = TryCatch(async (req, res) => {
  const { jobId } = req.params;
  const recruiterId = req.user._id;

  const job = await JobPost.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job post not found" });
  }

  const recruiter = await JobRecruiter.findById(recruiterId);


  const applications = await Application.find({ job: jobId })
    .populate("applicant", "name email phone")
    .populate("job", "title description company")
    
    .sort({ appliedAt: -1 });

  res.status(200).json(applications);
});


export const getJobApplicationById = TryCatch(async (req, res) => {
  const { id } = req.params;
  const recruiterId = req.user._id;

  const application = await Application.findById(id)
    .populate("applicant", "name email phone")
    .populate("job", "title description company");

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  const job = await JobPost.findById(application.job);
  if (!job || job.company.toString() !== recruiterId.toString()) {
    return res.status(403).json({ message: "You are not authorized to view this application" });
  }

  res.status(200).json(application);
});

export const updateApplicationStatus = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const recruiterId = req.user._id;

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  const job = await JobPost.findById(application.job);
  if (!job || job.company.toString() !== recruiterId.toString()) {
    return res.status(403).json({ message: "You are not authorized to update this application" });
  }

  application.status = status;
  await application.save();
  
  res.status(200).json({ message: "Application status updated successfully" });
});



export const getApplicationsByStatus = TryCatch(async (req, res) => {
    const { status } = req.params;
    const recruiterId = req.user._id;

    const recruiter = await JobRecruiter.findById(recruiterId);
    if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found" });
    }
    const jobs = await JobPost.find({ company: recruiterId }).select("_id");
    if (!jobs.length) {
        return res.status(404).json({ message: "No jobs found for this recruiter" });
    }
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds }, status })
        .populate({
            path: "job",
            select: "title description company",
            populate: { path: "company", select: "companyName companyLogo" }
        })
        .populate("applicant", "name email phone")
        .sort({ appliedAt: -1 });

    if (!applications.length) {
        return res.status(404).json({ message: "No applications found with this status for your jobs" });
    }

    res.status(200).json(applications);
});


export const deleteApplication = TryCatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const application = await Application.findOneAndDelete({ _id: id, applicant: userId });

  if (!application) {
    return res.status(404).json({ message: "Application not found or already deleted" });
  }

  res.status(200).json({ message: "Application deleted successfully" });
});
