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
exports.getAllRatings = exports.averageRating = exports.createRating = void 0;
const Course_1 = require("../models/Course");
const RatingAndReview_1 = require("../models/RatingAndReview");
const mongoose_1 = __importDefault(require("mongoose"));
// Create Rating
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Giving Review & Rating Functionality
        // get User Id
        //@ts-ignore
        const userId = req.user.id;
        // Fetch Data
        const { review, rating, courseId } = req.body;
        // Check user is Enrolled or not
        const courseDetails = yield Course_1.CourseModel.findOne({ _id: courseId,
            studentsEnrolled: userId
        });
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "Unable to find User Enrollement"
            });
        }
        // Check user Alerady Give given a Review ?
        const AlreadyReviewed = yield RatingAndReview_1.RatingAndReviewModel.findOne({
            user: userId,
            course: courseId
        });
        if (!AlreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "Already Created a Review & Another review will Not be Allowwed"
            });
        }
        // Create a Review 
        const ReviewDetails = yield RatingAndReview_1.RatingAndReviewModel.create({
            rating: rating,
            review: review,
            user: userId,
            course: courseId,
        });
        console.log(ReviewDetails);
        // Update Course with Rating and Review
        const RatingUpdate = yield Course_1.CourseModel.findByIdAndUpdate({ _id: courseId }, {
            $push: {
                ratingAndReviews: ReviewDetails._id,
            }
        }, {
            new: true
        });
        console.log(RatingUpdate);
        // Return Response
        return res.status(200).json({
            success: true,
            message: "Rating & Review Ceated and Updated Successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Creating Review"
        });
    }
});
exports.createRating = createRating;
// Get Average Rating
const averageRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get course Id
        const courseId = req.body.courseId;
        // validation
        if (!mongoose_1.default.isValidObjectId(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid courseId",
            });
        }
        // calculate avg rating 
        const result = yield RatingAndReview_1.RatingAndReviewModel.aggregate([
            {
                $match: {
                    course: new mongoose_1.default.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        // Return Response
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Avg Rating Returned Successfully",
                averageRating: result[0].averageRating,
            });
        }
        // If No Rating Review Has Been Passed
        return res.status(200).json({
            success: false,
            message: "No Rating Given Till Now",
            averageRating: 0
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while getting Average Review"
        });
    }
});
exports.averageRating = averageRating;
// Get All Rating & Reviews
const getAllRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRatings = yield RatingAndReview_1.RatingAndReviewModel.find({}).sort({ rating: "desc" })
            .populate({
            path: "user",
            select: "firstName , lastName , email , image",
        })
            .populate({
            path: "course",
            select: "courseName",
        }).exec();
        // Return Response
        return res.status(200).json({
            success: true,
            message: "Ratings Fetched Suuccessfully",
            data: allRatings,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while getting Average Review"
        });
    }
});
exports.getAllRatings = getAllRatings;
