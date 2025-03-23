import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    status: { 
      type: String, 
      enum: ["Applied", "Shortlisted", "Interview", "Hired", "Rejected"], 
      default: "Applied" 
    },
    appliedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
