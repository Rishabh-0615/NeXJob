import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
    mobile:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
    email:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    skills: [{ type: String }],
    experienceLevel: { type: String, enum: ["Fresher", "Junior", "Mid-level", "Senior", "Expert"] },
    education: [
        {
          degree: String,
          institution: String,
          startDate: Date,
          endDate: Date,
          grade: String
        }
      ],
    portfolioURL: { type: String },
    experience: [
        {
          jobTitle: String,
          company: String,
          location: String,
          startDate: Date,
          endDate: Date,
          description: String
        }
    ],  

},
{timestamps:true}
)

export const seekerProfile = mongoose.model("seekerProfile",schema);