import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "JobRecruiter", required: true },
    description: { type: String, required: true },
    
    skills: { type: [String], required: true },

    eligibility: {
      hiringFor: { type: String, required: true, enum: ["Fresher", "Experienced", "Both"] },
      minExperience: { type: Number, min: 0 },
      maxExperience: { type: Number },
      education: [{ 
        degree: { type: [String], required: true },
        field: { type: [String] },
        minPercentage: { type: [Number], min: 0, max: 100 }
      }]
    },

    compensation: {
      salary: {
        min: { type: Number },
        max: { type: Number }
      },
      isNegotiable: { type: Boolean, default: false }
    },

    location: {
      type: { type: String, enum: ["Remote", "Onsite", "Hybrid"], required: true },
      city: { type: String },
      country: { type: String, required: true }
    },

    industry: {
      type: String,
      required: true,
      enum: [
        "Technology & IT", "Finance & Banking", "Healthcare & Pharmaceuticals", "Education & Training",
        "Manufacturing & Engineering", "Retail & E-commerce", "Marketing & Advertising",
        "Construction & Real Estate", "Logistics & Transportation", "Hospitality & Tourism",
        "Government & Public Sector", "Legal & Consulting", "Other"
      ]
    },

    jobType: { 
      type: String, 
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"], 
      required: true 
    },
    
    deadline: { type: Date, required: true },
    
    applicants: [{ 
      applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["Applied", "Shortlisted", "Interview", "Hired", "Rejected"], default: "Applied" }
    }],
    
    status: { type: String, enum: ["Draft", "Published", "Closed"], default: "Draft" },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const JobPost = mongoose.model("JobPost", jobPostSchema);
