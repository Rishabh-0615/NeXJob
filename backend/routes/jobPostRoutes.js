import express from "express";
import { isAuth } from "../middlewares/isAuth.js"; 
import {
  createJobPost,
  getJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
  getMyPosts,
} from "../controllers/jobPostControllers.js";

const router = express.Router();

router.post("/create", isAuth, createJobPost);

router.get("/getJob",isAuth, getJobPosts);
router.get("/myJob",isAuth, getMyPosts);
router.get("/getJob/:id",isAuth, getJobPostById);
router.put("/updateJob/:id", isAuth, updateJobPost);
router.delete("/delete/:id", isAuth, deleteJobPost);

export default router;
