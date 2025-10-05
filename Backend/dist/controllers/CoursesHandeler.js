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
exports.getCourseDetails = exports.getAllCources = exports.createCourse = exports.objectIdSchema = void 0;
const User_1 = require("../models/User");
const Course_1 = require("../models/Course");
const ImageUploader_1 = require("../utils/ImageUploader");
const zod_1 = __importDefault(require("zod"));
const mongoose_1 = __importDefault(require("mongoose"));
// To define the zod validation Implementation for a mongoose.objectId Entity...example Tag.......
exports.objectIdSchema = zod_1.default
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
    .transform((val) => new mongoose_1.default.Types.ObjectId(val));
// Handeler Function For creating Course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Fetch Data
        const courseDataSchema = zod_1.default.object({
            courseName: zod_1.default.string(),
            courseDescription: zod_1.default.string(),
            whatToLearn: zod_1.default.string(),
            price: zod_1.default.number(),
            Tag: exports.objectIdSchema,
        });
        const { courseName, courseDescription, whatToLearn, price, Tag } = courseDataSchema.parse(req.body);
        // Fetch Thumbnail from file
        if (!req.files || !req.files.thumbnailImage) {
            return res.status(400).json({
                success: false,
                message: "No Image Uploaded",
            });
        }
        const courseThumbnail = Array.isArray(req.files.thumbnailImage)
            ? req.files.thumbnailImage[0]
            : req.files.thumbnailImage;
        // const courseThumbnail = req?.files.thumbnailImage;
        // check for Instructor -> we also need to Store Instructor in course Hence we need to Fetch The ObjectId
        //@ts-ignore
        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: "No userId Found for Instructor.",
            });
        }
        //@ts-ignore
        const userId = req.user.id;
        const InstructorDetails = yield User_1.UserModel.findById(userId);
        if (!InstructorDetails) {
            return res.status(400).json({
                succes: false,
                message: "No Instructor Details Found"
            });
        }
        const TagDetails = yield User_1.UserModel.findById(Tag);
        if (!TagDetails) {
            return res.status(400).json({
                succes: false,
                message: "No Tags Details Found"
            });
        }
        //Upload Image to Cloudanary
        const thumbnailImage = yield (0, ImageUploader_1.uploadImageToCloudinary)(courseThumbnail, (_a = process.env.FOLDER_NAME) !== null && _a !== void 0 ? _a : "default-folder");
        // Create a New Course
        const newCourse = yield Course_1.CourseModel.create({
            courseName,
            courseDescription,
            instructor: InstructorDetails._id,
            tag: TagDetails._id,
            whatToLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
        });
        // Add this course in User schema of Instructor
        yield User_1.UserModel.findByIdAndUpdate({ _id: InstructorDetails._id }, {
            $push: {
                courses: newCourse._id,
            }
        }, {
            new: true
        });
        // Update Tag schema
        yield User_1.UserModel.findByIdAndUpdate({ _id: TagDetails._id }, {
            $push: {
                courses: newCourse._id,
            }
        }, {
            new: true
        });
        // Return Response
        return res.status(200).json({
            success: true,
            message: "Cource Added Successfully",
            data: newCourse,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something Happened in Course Creation Handeler"
        });
    }
});
exports.createCourse = createCourse;
// Get all cources Handeler Function
const getAllCources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCources = yield Course_1.CourseModel.find({}, {
            courseName: true,
            courseDescription: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data: allCources,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            succes: false,
            message: "Something wrong Happened while Feching Cources",
        });
    }
});
exports.getAllCources = getAllCources;
// Get Course Details
const getCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get UserId
        const courseId = req.body;
        // Fetch course Details
        const courseDetails = yield Course_1.CourseModel.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetals"
            }
        })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
            path: "courseContent",
            populate: {
                path: "SubSection"
            }
        }).exec();
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Failed to Fetch Course Details"
            });
        }
        // Return Response
        return res.status(200).json({
            success: false,
            message: "Fetched Course Details Successfully !",
            data: courseDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something Wrong Happened While getting course Details"
        });
    }
});
exports.getCourseDetails = getCourseDetails;
