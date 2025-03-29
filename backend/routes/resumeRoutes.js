import express from "express";
import {
  getResume,
  saveResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// All routes require authentication
router.use(isAuth);

// Get resume
router.get("/", getResume);

// Create or update resume
router.post("/", saveResume);

// Delete resume
router.delete("/", deleteResume);

export default router;
