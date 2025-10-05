"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileHandeler_1 = require("../controllers/ProfileHandeler");
const Middlewares_1 = require("../Middleware/Middlewares");
const multerconfig_1 = require("../config/multerconfig");
const router = (0, express_1.Router)();
router.get("/me", Middlewares_1.auth, ProfileHandeler_1.getAllUserDetails);
router.put("/update", Middlewares_1.auth, ProfileHandeler_1.updateProfile);
router.put("/update-dp", multerconfig_1.upload.single("displayPicture"), ProfileHandeler_1.updateDisplayPicture); // Also Need auth Middleware
router.get("/enrolled-courses", Middlewares_1.auth, ProfileHandeler_1.getEnrolledCourses);
router.delete("/delete", Middlewares_1.auth, ProfileHandeler_1.deleteProfile);
exports.default = router;
