import { Router } from "express";
import { SignIn } from "../controllers/Signin";
import { Signup } from "../controllers/Signup";
import { sendOTP } from "../controllers/Sendotp";
import { resetPassword } from "../controllers/ResetPassword";
import { resetPasswordExpires } from "../controllers/ResetPassword";
import { auth } from "../Middleware/Middlewares";

const router = Router();

router.post("/api/v1/auth/signup", Signup);
router.post("/api/v1/auth/signin", SignIn);
router.post("/api/v1/auth/send-otp", sendOTP);
router.post("/api/v1/auth/reset-password", auth ,resetPassword);
router.post("/api/v1/auth/reset-password", auth ,resetPasswordExpires);


export default router;
