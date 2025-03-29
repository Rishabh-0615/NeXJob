import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "./controllers/passport.js";
import session from "express-session";
import cloudinary from "cloudinary";
import { createServer } from "http";  // Import http module
import { Server } from "socket.io"; 
import cors from "cors";  // Import cors
dotenv.config();
const app = express();
const port = process.env.PORT;

if (
  !process.env.Cloud_Name ||
  !process.env.Cloud_Api ||
  !process.env.Cloud_Secret ||
  !process.env.PORT
) {
  console.error(
    " Missing required environment variables. Check your .env file."
  );
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
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import userRoutes from "./routes/userRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import jopPostRoutes from "./routes/jobPostRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import connectDb from "./database/db.js";

import InterviewRoutes from "./routes/InterviewRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
app.use("/api/user", userRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/jobPost", jopPostRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", InterviewRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Create an HTTP server using Express app
const server = createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: { origin: "*" },
});

// WebSocket Logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("join-room", (interviewId) => {
    socket.join(interviewId);
    console.log(`🟡 Client joined room: ${interviewId}`);
  });

  socket.on("code-update", ({ interviewId, code }) => {
    console.log(`🔵 Code update in room ${interviewId}`);
    socket.to(interviewId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  connectDb();
});

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import passport from "./controllers/passport.js";
// import session from "express-session";
// import cloudinary from "cloudinary";
// import { createServer } from "http";  // Import http module
// import { Server } from "socket.io"; 
// import cors from "cors";  // Import cors

// dotenv.config();
// const app = express();
// const port = process.env.PORT;

// // Check for required environment variables
// if (!process.env.Cloud_Name || !process.env.Cloud_Api || !process.env.Cloud_Secret || !process.env.PORT) {
//   console.error("Missing required environment variables. Check your .env file.");
//   process.exit(1);
// }

// // Cloudinary Config
// cloudinary.v2.config({
//   cloud_name: process.env.Cloud_Name,
//   api_key: process.env.Cloud_Api,
//   api_secret: process.env.Cloud_Secret,
// });

// // Middleware
// app.use(express.json());  // ✅ Ensures JSON parsing
// app.use(cookieParser());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5174",
//   credentials: true,
// }));
// app.use(session({
//   secret: process.env.SESSION_SECRET || "qwertyuiop",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 24 * 60 * 60 * 1000
//   },
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Import Routes
// import userRoutes from "./routes/userRoutes.js";
// import recruiterRoutes from "./routes/recruiterRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import jobPostRoutes from "./routes/jobPostRoutes.js";
// import applicationRoutes from "./routes/applicationRoutes.js";
// import connectDb from "./database/db.js";
// import InterviewRoutes from "./routes/InterviewRoutes.js";
// import chatbotRoutes from "./routes/chatbotRoutes.js";

// // Routes
// app.use("/api/user", userRoutes);
// app.use("/api/recruiter", recruiterRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/jobPost", jobPostRoutes);
// app.use("/api/application", applicationRoutes);
// app.use("/api/interview", InterviewRoutes);
// app.use("/api/chatbot", chatbotRoutes);

// // Create an HTTP server using Express app
// const server = createServer(app);

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// // WebSocket Logic
// io.on("connection", (socket) => {
//   console.log("🟢 New client connected:", socket.id);

//   socket.on("join-room", (interviewId) => {
//     socket.join(interviewId);
//     console.log(`🟡 Client joined room: ${interviewId}`);
//   });

//   socket.on("code-update", ({ interviewId, code }) => {
//     console.log(`🔵 Code update in room ${interviewId}`);
//     socket.to(interviewId).emit("code-update", code);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Client disconnected:", socket.id);
//   });
// });

// // Start server
// server.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
//   connectDb();
// });
