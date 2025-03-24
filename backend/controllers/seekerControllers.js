import TryCatch from "../utils/TryCatch.js";
import { SeekerProfile } from "../models/seekerprofileModel.js";

export const updateProfile = TryCatch(async(req,res)=>{
    const {userId,skills,experienceLevel,education,portfolioURL,experience} = req.body;
    const profile  = await SeekerProfile.findOne({name:userId});
    if(!profile)
        return res.status(404).json({success:false,message:"Profile not found. Complete your profile first"});

    if(skills) profile.skills = skills;
    if(experienceLevel) profile.experienceLevel = experienceLevel;
    if(education) profile.education = education;
    if(portfolioURL) profile.portfolioURL = portfolioURL;
    if(experience) profile.experience = experience;
    await profile.save();

    res.status(200).json({success:true,message:"Profile updated successfully!"});

});