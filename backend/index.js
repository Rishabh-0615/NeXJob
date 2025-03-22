import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './controllers/passport.js';
import session from 'express-session';
dotenv.config();
const app=express();
const port=process.env.PORT;

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
import connectDb from './database/db.js';
app.use('/api/user',userRoutes);


app.listen(port,()=>{
    console.log(`Connected at port ${port}`);
    connectDb();
})