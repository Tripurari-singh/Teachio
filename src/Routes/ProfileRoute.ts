import { Router } from "express";
import { updateProfile , deleteProfile , getAllUserDetais, updateDisplayPicture, getEnrolledCourses } from "../controllers/ProfileHandeler";
import { auth } from "../Middleware/Middlewares";

const router = Router();

router.get("/me" , auth , getAllUserDetais);
router.put("/update" , auth, updateProfile);
router.put("/update-dp" , auth , updateDisplayPicture);
router.get("/enrolled-courses" , auth , getEnrolledCourses);
router.delete("/delete" , auth,  deleteProfile);

export default router;