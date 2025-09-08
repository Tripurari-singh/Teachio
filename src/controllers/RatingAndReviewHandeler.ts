import { CourseModel } from "../models/Course";
import { Request , Response } from "express";
import { RatingAndReviewModel } from "../models/RatingAndReview";
import mongoose from "mongoose";
// Create Rating
export const createRating = async(req : Request , res : Response) => {
try {
    
    // Giving Review & Rating Functionality
    // get User Id
    //@ts-ignore
    const userId = req.user.id;
    // Fetch Data
    const {review , rating , courseId} = req.body;
    // Check user is Enrolled or not
    const courseDetails = await CourseModel.findOne({_id : courseId , 
        studentsEnrolled : userId
    })

    if(!courseDetails){
        return res.status(400).json({
            success : false,
            message  : "Unable to find User Enrollement"
        })
    }
    // Check user Alerady Give given a Review ?
    const AlreadyReviewed = await RatingAndReviewModel.findOne({
        user : userId,
        course : courseId 
    })
    if(!AlreadyReviewed){
        return res.status(400).json({
            success : false , 
            message : "Already Created a Review & Another review will Not be Allowwed"
        })
    }
    // Create a Review 
    const ReviewDetails = await RatingAndReviewModel.create({
        rating : rating,
        review : review,
        user : userId,
        course : courseId,
    })
    console.log(ReviewDetails);
    // Update Course with Rating and Review
    const RatingUpdate = await CourseModel.findByIdAndUpdate({_id : courseId} , 
        {
            $push : {
                ratingAndReviews : ReviewDetails._id,
            }
        } , {
            new : true
        }
    )
    console.log(RatingUpdate);

    // Return Response
    return res.status(200).json({
        success : true,
        message : "Rating & Review Ceated and Updated Successfully",
    })
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success : false,
        message : "Something wrong Happened while Creating Review"
    })
}
}

// Get Average Rating
export const averageRating = async(req  : Request , res : Response) => {
    try {
        // Get course Id
        const courseId = req.body.courseId;
        // calculate avg rating 
        const result = await RatingAndReviewModel.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId)
                }
            }
        ])  
        // Return Response
    }
    catch(error){
    console.log(error);
    return res.status(500).json({
        success : false,
        message : "Something wrong Happened while getting Average Review"
    })
    }
}
// Get All Rating