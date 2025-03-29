import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRecruiter",
      
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
      
    },
    interviewId: { type: String, unique: true, required: true },
    interviewLink: { type: String, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
