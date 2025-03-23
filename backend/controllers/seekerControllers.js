import TryCatch from "../utils/TryCatch";
import { seekerProfile } from "../models/seekerprofileModel";
import { User } from "../models/jobseekerModel";


export const completeProfile = TryCatch(async(req,res)=>{
    const {userId, skills, experienceLevel, education, portfolioURL, experience } = req.body;

    const user = await User.findById(userId);
    if(!user)
        return res.status(400).json({success:false,message:"User Not found"})
    
    const existingProfile = await seekerProfile.findOne({email:user.email});
    if(existingProfile)
        return res.status(400).json({success:false,message:"Profile already exists. Use Update Profile instead "});

    const profile = await seekerProfile.create({
        name:user._id,
        mobile:user.mobile,
        email:user.email,
        skills,
        experienceLevel,
        education,
        portfolioURL,
        experience
    });
    res.status(201).json({success:true,message:"Profile completed Successfully!",profile})
});

export const updateProfile = TryCatch(async(req,res)=>{
    const {userId,skills,experienceLevel,education,portfolioURL,experience} = req.body;
    const profile  = await seekerProfile.findOne({name:userId});
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