import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../models/jobseekerModel.js';
import { Admin } from '../models/adminModel.js';
import { JobRecruiter } from '../models/jobrecruiterModel.js';

export const isAuth=async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token)
            return res.status(403).json({message:"Please login"})

        const decodedData = jwt.verify(token,process.env.JWT_SEC);
        if(!decodedData)
            return res.status(403).json({message:"Token expired"})
        req.user = await User.findById(decodedData.id) || await Admin.findById(decodedData.id)||await JobRecruiter.findById(decodedData.id);
        if(!req.user)
            return res.status(403).json({message:"Please login"})
        next();
    }
    catch(error){
        res.status(500).json({message:"Please login"});
    }
}
