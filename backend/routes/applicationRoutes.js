import express from "express";
import {
  applyForJob,
  getApplications,
  getApplicationById,
  withdrawApplication,
  getJobApplications,
  getJobApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getApplicationsByStatus,
  getAllJobApplications
} from "../controllers/applicationControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/apply", isAuth, applyForJob);
router.get("/getapplications", isAuth, getApplications);
router.get("/getapplications/:id", isAuth, getApplicationById);
router.delete("/withdraw/:id", isAuth, withdrawApplication);
router.delete("/deleteapplications/:id", isAuth, deleteApplication);
router.get("/jobapplicants/:jobId", isAuth, getJobApplications);
router.get("/jobapplicantsId/:id", isAuth, getJobApplicationById);
router.get("/getAll", isAuth, getAllJobApplications);
router.patch("/status/:id", isAuth, updateApplicationStatus);
router.get("/getStatus/:status",isAuth,getApplicationsByStatus)

export default router;
