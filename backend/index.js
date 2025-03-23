import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './controllers/passport.js';
import session from 'express-session';
import cloudinary from 'cloudinary';
dotenv.config();
const app=express();
const port=process.env.PORT;


if (!process.env.Cloud_Name || !process.env.Cloud_Api || !process.env.Cloud_Secret || !process.env.PORT) {
  console.error(" Missing required environment variables. Check your .env file.");
  process.exit(1);
}

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

app.use(cookieParser());
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET || "qwertyuiop",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
      },
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());



import userRoutes from './routes/userRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import jopPostRoutes from './routes/jobPostRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import connectDb from './database/db.js';
app.use('/api/user',userRoutes);
app.use('/api/recruiter',recruiterRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/jobPost',jopPostRoutes);
app.use('/api/application',applicationRoutes);


app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
    connectDb();
})