import { Router } from "express";
import { updateProfile , deleteProfile , getAllUserDetais, updateDisplayPicture, getEnrolledCourses } from "../controllers/ProfileHandeler";
import { auth } from "../Middleware/Middlewares";

const router = Router();

router.get("/api/v1/profile/me" , auth , getAllUserDetais);
router.put("/api/v1/profile/update" , auth, updateProfile);
router.put("/api/v1/profile/update-dp" , auth , updateDisplayPicture);
router.get("/api/v1/profile/enrolled-courses" , auth , getEnrolledCourses);
router.delete("/api/v1/profile/delete" , auth,  deleteProfile);

export default router;