import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    website: { type: String },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    password: { type: String, required: true },
    companyLogo: {
      id: { type: String },
      url: { type: String },
    },
    isVerifiedByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const JobRecruiter = mongoose.models.JobRecruiter || mongoose.model("JobRecruiter", schema);
