import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
  },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
      grade: String,
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
      achievements: [String],
    },
  ],
  skills: [
    {
      category: String,
      items: [String],
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      technologies: [String],
      link: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      date: Date,
      link: String,
    },
  ],
  languages: [
    {
      name: String,
      proficiency: String,
    },
  ],
  template: {
    type: String,
    enum: ["modern", "classic", "minimal"],
    default: "modern",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
resumeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
