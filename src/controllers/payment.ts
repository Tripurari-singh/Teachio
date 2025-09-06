import { instance } from "../config/razorpay";
import { CourseModel } from "../models/Course";
import { UserModel } from "../models/User";
import { courseEnrollmentEmail } from "../Mail/courseEnrollementemail";
import { Request , Response } from "express";
import mongoose from "mongoose";
import { createHmac } from "crypto";

// Capture the payment and initalise the Razorpau Order
export const capturePayment = async(req : Request , res : Response) => {
   try {
     // Get courseId / userId
    //@ts-ignore
    const userId = req.user.id;
    const courseId = req.body.id;

    // Validation
    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Invalid UserId / UserId Not Found"
        })
    }
    
    // valid courseId
    if(!courseId){
        return res.status(401).json({
            success : false,
            message : "Invalid courseId / CourseId Not Found"
        })
    }

    // Valid CoureDetails
    const courseDetails = await CourseModel.findById({id : courseId});
    if(!courseDetails){
        return res.status(402).json({
            success : false,
            message : "Course Deatils Not Found / Invalid CourseDetails"
        })
    }

    // User Already pay for same course
    // Convert the userId from string to objectId type
    const uId = new mongoose.Types.ObjectId(userId);
    if(courseDetails.studentsEnrolled.includes(uId)){
        return res.status(200).json({
            success : false,
            message : "User is Already in this course"
        })
    }

    // order Create
    // Razorpay Documentation Reference
    const amount = courseDetails.price;
    const currency = "INR";

    const options = {
        amount : amount * 100,
        currency,
        receipt : Math.random().toString(),
        notes : {
            courseId : courseId,
            userId
        }
    }

     // Initiate the payment using Razorpay
        try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);


        // Response
     return res.status(200).json({
        success : true,
        message : "Payment Initiated successfully",
        courseName : courseDetails.courseName,
        courseContent : courseDetails.courseContent,
        courseDescription : courseDetails.courseDescription,
        orderId : paymentResponse.id,
        currency : paymentResponse.currency,
        amount : paymentResponse.amount,
     })
        }catch(error){
            console.log(error);
            return res.status(400).json({
                success : false,
                message : "Could Not Initiate The Payment...."
            })
        }
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success : false,
        message : " somethingWent Wrong while Capturing the Payment",
    })
   }
    
}

export const verifySignature = async(req : Request , res : Response) => {
    try {
        const webHookSecret = "wfdbwudhgewfiu";

        const signature = req.headers["x-razorpay-signature"];

        // Create a Hmac Object to Implement Hashing via sha256 Algorithm.....
        const shasum = crypto.createHmac("sha256" , webHookSecret);
     }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "something Went Wrong while verifying verifying the Payment Signature"
        })
    }
}