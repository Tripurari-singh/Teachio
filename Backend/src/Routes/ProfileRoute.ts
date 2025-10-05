import { Router } from "express";
import { updateProfile , deleteProfile , getAllUserDetails, updateDisplayPicture, getEnrolledCourses } from "../controllers/ProfileHandeler";
import { auth } from "../Middleware/Middlewares";
import { upload } from "../config/multerconfig";

const router = Router();

router.get("/me" , auth , getAllUserDetails);
router.put("/update" , auth, updateProfile);
router.put("/update-dp" ,upload.single("displayPicture"), updateDisplayPicture);   // Also Need auth Middleware
router.get("/enrolled-courses" , auth , getEnrolledCourses);
router.delete("/delete" , auth,  deleteProfile);

export default router;