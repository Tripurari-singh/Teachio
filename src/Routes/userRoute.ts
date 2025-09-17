import { Router } from "express";
import { SignIn } from "../controllers/Signin";
import { Signup } from "../controllers/Signup";
import { sendOTP } from "../controllers/Sendotp";
import { resetPassword } from "../controllers/ResetPassword";
import { resetPasswordExpires } from "../controllers/ResetPassword";
import { auth } from "../Middleware/Middlewares";

const router = Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/send-otp", sendOTP);
router.post("/reset-password", auth ,resetPassword);
// router.post("/reset-password", auth ,resetPasswordExpires);


export default router;
