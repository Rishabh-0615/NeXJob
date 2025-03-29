import TryCatch from "../utils/TryCatch.js";
import { SeekerProfile } from "../models/seekerprofileModel.js";
import { User } from "../models/jobseekerModel.js";

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

    res.status(200).json({success:true,
        profile,
        message:"Profile updated successfully!"});

});

export const getProfile = TryCatch(async (req, res) => {
    const userId = req.user?._id;  

    if (!userId) {
        return res.status(401).json({ message: "Please Login" });
    }

    const user = await User.findOne({ _id: userId }); 
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    console.log(user.email); 

    const profile = await SeekerProfile.findOne({ email: user.email });

    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
});
