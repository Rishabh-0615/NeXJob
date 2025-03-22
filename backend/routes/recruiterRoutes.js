import express from 'express'
import { loginRecruiter, registerRecruiterWithOtp, verifyOtpAndRegisterRecruiter } from '../controllers/recruiterControllers.js';

const router = express.Router();

router.post('/registerRecruiter',registerRecruiterWithOtp);
router.post('/verifyRecruiter/:token',verifyOtpAndRegisterRecruiter);
router.post('/loginRecruiter',loginRecruiter);




export default router;