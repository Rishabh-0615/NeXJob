import express from 'express'
import { forgetPassword, loginRecruiter,  logoutRecruiter,  recruiterProfile, registerWithOtp, resetPassword,   verifyOtpAndRegisterRecruiter } from '../controllers/recruiterControllers.js';
import { isAuth } from '../middlewares/isAuth.js';
import uploadFile from '../middlewares/multer.js';

const router = express.Router();

router.post('/register',uploadFile,registerWithOtp);
router.post('/verify/:token',verifyOtpAndRegisterRecruiter);
router.post('/login',loginRecruiter);
router.post('/forgot',forgetPassword);
router.post('/reset/:token',resetPassword)
router.get('/me',isAuth,recruiterProfile);
router.get('/user/:id',isAuth,);
router.get('/logout',isAuth,logoutRecruiter);



export default router;