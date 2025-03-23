import { JobPost } from "../models/jobPostModel.js";
import { Application } from "../models/applicationModel.js";
import { JobRecruiter } from "../models/jobrecruiterModel.js";
import { User } from "../models/jobseekerModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js"; 
import cloudinary from "cloudinary";
import uploadFile from "../middlewares/multer.js";



export const applyForJob = [
    uploadFile, 
    TryCatch(async (req, res) => {
      const { jobId } = req.body;
      const userId = req.user._id;

      const job = await JobPost.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job post not found" });
      }
  
    
      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied for this job" });
      }

      let resumeUrl = null;
      let coverLetterUrl = null;
  
      if (req.files?.resume) {
        const resumeDataUri = getDataUrl(req.files.resume[0]);
        const uploadResponse = await cloudinary.uploader.upload(resumeDataUri.content, {
          folder: "job-applications",
          resource_type: "raw",
        });
        resumeUrl = uploadResponse.secure_url;
      }
  
      if (req.files?.coverLetter) {
        const coverLetterDataUri = getDataUrl(req.files.coverLetter[0]); 
        const uploadResponse = await cloudinary.uploader.upload(coverLetterDataUri.content, {
          folder: "job-applications",
          resource_type: "raw",
        });
        coverLetterUrl = uploadResponse.secure_url;
      }
  
      if (!resumeUrl) {
        return res.status(400).json({ message: "Resume is required" });
      }
  
    
      const application = await Application.create({
        job: jobId,
        applicant: userId,
        resume: resumeUrl,
        coverLetter: coverLetterUrl,
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

  if (application.applicant.toString() !== userId.toString()) {
    return res.status(403).json({ message: "You are not authorized to view this application" });
  }

  res.status(200).json(application);
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

export const getJobApplications = TryCatch(async (req, res) => {
  const { jobId } = req.params;
  const recruiterId = req.user._id;

  const job = await JobPost.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job post not found" });
  }

  const recruiter = await JobRecruiter.findById(recruiterId);
  if (!recruiter || job.company.toString() !== recruiterId.toString()) {
    return res.status(403).json({ message: "You are not authorized to view applications for this job" });
  }

  const applications = await Application.find({ job: jobId })
    .populate("applicant", "name email phone")
    .populate("job", "title description company")
    .sort({ appliedAt: -1 });

  if (!applications.length) {
    return res.status(404).json({ message: "No applications found for this job" });
  }

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

export const deleteApplication = TryCatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const application = await Application.findOneAndDelete({ _id: id, applicant: userId });

  if (!application) {
    return res.status(404).json({ message: "Application not found or already deleted" });
  }

  res.status(200).json({ message: "Application deleted successfully" });
});


export const getApplicationsByStatus = TryCatch(async (req, res) => {
    const { status } = req.params;
    const userId = req.user._id;
    
    const applications = await Application.find({ applicant: userId, status })
        .populate("job", "title description company")
        .populate("applicant", "name email")
        .sort({ appliedAt: -1 });
    
    if (!applications.length) {
        return res.status(404).json({ message: "No applications found with this status" });
    }
    
    res.status(200).json(applications);
    });