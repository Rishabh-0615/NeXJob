import express from 'express';
import { forgetPassword, loginUser, logoutUser, myProfile, registerWithOtp, resetPassword, userProfile, verifyOtpAndRegister } from '../controllers/userControllers.js';
import { isAuth } from '../middlewares/isAuth.js';
import passport from '../controllers/passport.js';
import { completeProfile, updateProfile } from '../controllers/seekerControllers.js';

const router = express.Router();
router.post('/register',registerWithOtp);
router.post('/verify/:token',verifyOtpAndRegister);
router.post('/login',loginUser);
router.post('/forgotpassword',forgetPassword);
router.post('/resetpassword/:token',resetPassword)
router.get('/me',isAuth,myProfile);
router.get('/user/:id',isAuth,userProfile);
router.get('/logout',isAuth,logoutUser);

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      generateToken(req.user, res);
      res.redirect(process.env.CLIENT_URL);
    }
  );

  router.put('/profile/complete',isAuth,completeProfile);
  router.put('/profile/update',isAuth,updateProfile);


export default router;