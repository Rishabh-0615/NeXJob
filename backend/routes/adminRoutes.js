import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { adminLogin, getUnverifiedRecruiters, meadmin, verifyRecruiter } from '../controllers/adminControllers.js';


const router = express.Router();

router.post("/admin-login", adminLogin);
router.get("/meadmin", isAuth, meadmin);
router.get("/getUnverifiedRecruiters", isAuth,getUnverifiedRecruiters);

router.put("/verify-recruiter/:userId",isAuth, verifyRecruiter);


export default router;
