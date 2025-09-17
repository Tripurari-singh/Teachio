import { Router } from "express";
import { updateProfile , deleteProfile , getAllUserDetais } from "../controllers/ProfileHandeler";
import { auth } from "../Middleware/Middlewares";

const router = Router();
router.get("/" , auth , getAllUserDetais);
router.put("/" , auth, updateProfile);
router.delete("/" , auth,  deleteProfile);
