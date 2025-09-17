import { Router } from "express";
import { updateProfile , deleteProfile , getAllUserDetais, updateDisplayPicture, getEnrolledCourses } from "../controllers/ProfileHandeler";
import { auth } from "../Middleware/Middlewares";

const router = Router();

router.get("/" , auth , getAllUserDetais);
router.put("/" , auth, updateProfile);
router.put("/" , auth , updateDisplayPicture);
router.get("/" , auth , getEnrolledCourses);
router.delete("/" , auth,  deleteProfile);
