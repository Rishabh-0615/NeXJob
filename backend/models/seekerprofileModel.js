import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name:{type:String,required:true},
  mobile:{type:Number},
  email:{type:String,required:true,unique:true},
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

export const SeekerProfile = mongoose.model("SeekerProfile",schema);