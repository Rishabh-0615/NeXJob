import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";
import { JobPost } from "../models/jobPostModel.js";
import { Application } from "../models/applicationModel.js";
import { JobRecruiter } from "../models/jobrecruiterModel.js";
import { User } from "../models/jobseekerModel.js";
import cron from "node-cron";


export const createJobPost = TryCatch(async (req, res) => {
    const {
        title, description, skills, eligibility, compensation, location,
        industry, jobType, deadline, status
    } = req.body;
    const recruiterId = req.user._id;

    const recruiter = await JobRecruiter.findById(recruiterId);
    if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found" });
    }

    const jobPost = await JobPost.create({
        title,
        description,
        skills,
        eligibility,
        compensation,
        location,
        industry,
        jobType,
        deadline,
        status,
        company: recruiterId,
        createdBy: recruiterId
    });

    res.status(201).json({ jobPost, message: "Job post created successfully" });
});

export const getJobPosts = TryCatch(async (req, res) => {
    const jobPosts = await JobPost.find({ status: "Published" }).populate("company", "companyName").populate("createdBy", "companyName").sort({ createdAt: -1 });
    if (!jobPosts || jobPosts.length === 0) {
        return res.status(404).json({ message: "No job posts found" });
    }

    res.status(200).json(jobPosts);
});

export const getJobPostById = TryCatch(async (req, res) => {
    const { id } = req.params;

    const jobPost = await JobPost.findById(id).populate("company", "companyName").populate("company","companyLogo").populate("createdBy", "name");
    if (!jobPost) {
        return res.status(404).json({ message: "Job post not found" });
    }

    res.status(200).json(jobPost);
});
export const getMyPosts =TryCatch(async(req,res)=>{
    const id = req.user._id;
    
    if(!id)
        return res.status(400).json({
            message:"Please Login"
    })

    const posts =await JobPost.find({company :id});
    res.status(200).json({
        posts,
    })

})
export const updateJobPost = TryCatch(async (req, res) => {
    const { id } = req.params;
    const recruiterId = req.user._id;

    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
        return res.status(404).json({ message: "Job post not found" });
    }
    if (jobPost.company.toString() !== recruiterId.toString()) {
        return res.status(403).json({ message: "You are not authorized to update this job post" });
    }
    const updatedJobPost = await JobPost.findByIdAndUpdate(id, req.body, { new: true });   
    res.status(200).json({ updatedJobPost, message: "Job post updated successfully" });
});

export const deleteJobPost = TryCatch(async (req, res) => {
    const { id } = req.params;
    const recruiterId = req.user._id;

    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
        return res.status(404).json({ message: "Job post not found" });
    }
    if (jobPost.company.toString() !== recruiterId.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this job post" });
    }
    await jobPost.deleteOne();
    res.status(200).json({ message: "Job post deleted successfully" });
});


export const disableExpiredJobPosts = async () => {
  const now = new Date();
  
  const expiredJobs = await JobPost.updateMany(
    { deadline: { $lt: now }, status: { $ne: "Closed" } },
    { $set: { status: "Closed" } }
  );

  console.log(`Disabled ${expiredJobs.modifiedCount} expired job posts.`);
};

cron.schedule("0 0 * * *", () => {
  console.log("Checking for expired job posts...");
  disableExpiredJobPosts();
});
