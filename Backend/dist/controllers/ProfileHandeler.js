"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnrolledCourses = exports.updateDisplayPicture = exports.getAllUserDetails = exports.deleteProfile = exports.updateProfile = void 0;
const zod_1 = __importDefault(require("zod"));
const Profile_1 = require("../models/Profile");
const User_1 = require("../models/User");
const ImageUploader_1 = require("../utils/ImageUploader");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get Data
        const ProfileInputSchema = zod_1.default.object({
            dateOfBirth: zod_1.default.string(),
            gender: zod_1.default.string(),
            about: zod_1.default.string(),
            contactNumber: zod_1.default.string(),
        });
        const { dateOfBirth, gender, about, contactNumber } = ProfileInputSchema.parse(req.body);
        // Get User Id
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        // Find Profile
        const userDeatils = yield User_1.UserModel.findById(userId);
        const ProfileId = userDeatils === null || userDeatils === void 0 ? void 0 : userDeatils.additionalDetals;
        // const ProfileDetails = await ProfileModel.findById(ProfileId);
        // console.log(ProfileDetails);
        // Update
        const updatedProfile = yield Profile_1.ProfileModel.findByIdAndUpdate(ProfileId, {
            dateOfBirth,
            gender,
            about,
            contactNumber
        }, {
            new: true
        });
        console.log(updatedProfile);
        // Return Response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Updating profile"
        });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Data
        //@ts-ignore
        const userId = req.user.id;
        const userDetails = yield User_1.UserModel.findById(userId);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Details Unable to Fetc / userId Issue",
            });
        }
        // Delete Profile
        yield Profile_1.ProfileModel.findByIdAndDelete({ _id: userDetails.additionalDetals });
        // Delete User
        yield User_1.UserModel.findByIdAndDelete({ _id: userId });
        // Response
        return res.status(200).json({
            success: true,
            message: "User / Profile Deleted Successfully"
        });
        //// We also Need to delete the user(Student) from the list of Enrolled students in the course Model
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Deleting profile"
        });
    }
});
exports.deleteProfile = deleteProfile;
const getAllUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found",
            });
        }
        const userDetails = yield User_1.UserModel.findById(userId)
            .populate("additionalDetals") // make sure this matches your schema field
            .exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "All details fetched successfully",
            data: userDetails,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting user details",
        });
    }
});
exports.getAllUserDetails = getAllUserDetails;
const updateDisplayPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const displayPicture = req.file;
        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No display picture provided",
            });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found",
            });
        }
        const image = yield (0, ImageUploader_1.uploadImageToCloudinary)(displayPicture.path, // ✅ use path
        process.env.FOLDER_NAME, 1000, 1000);
        const updatedProfile = yield User_1.UserModel.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true });
        return res.json({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.updateDisplayPicture = updateDisplayPicture;
const getEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //@ts-ignore
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found",
            });
        }
        const userDetails = yield User_1.UserModel.findOne({ _id: userId })
            .populate("courses")
            .exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getEnrolledCourses = getEnrolledCourses;
