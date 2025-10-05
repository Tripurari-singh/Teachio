import { instance } from "../config/razorpay";
import { CourseModel } from "../models/Course";
import { UserModel } from "../models/User";
import { Request , Response } from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import { mailSender } from "../utils/MailSender";


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


export const verifySignature = async (req: Request, res: Response) => {
  try {
    const webHookSecret = "wfdbwudhgewfiu";
    const signature = req.headers["x-razorpay-signature"] as string;
    const body = JSON.stringify(req.body);

    // Create hash
    const shasum = crypto.createHmac("sha256", webHookSecret);
    shasum.update(body);
    const digest = shasum.digest("hex");

    // Compare signature
    if (digest === signature) {
      console.log("Payment is Authorised");

      const { courseId, userId } = req.body.payload.payment.entity.notes;

      try {
        // 1. Enroll the student in the course
        const enrollCourse = await CourseModel.findByIdAndUpdate(
          { _id: courseId },
          {
            $push: {
              studentsEnrolled: userId,
            },
          },
          { new: true }
        );

        if (!enrollCourse) {
          return res.status(500).json({
            success: false,
            message: "Failed to add the user in the CourseModel",
          });
        }

        console.log("Course updated:", enrollCourse);

        // 2. Update the student record with the new course
        const enrollStudent = await UserModel.findByIdAndUpdate(
          { _id: userId },
          {
            $push: {
              courses: courseId,
            },
          },
          { new: true }
        );

        if (!enrollStudent) {
          return res.status(500).json({
            success: false,
            message: "Failed to add the course in UserModel",
          });
        }

        console.log("User updated:", enrollStudent);

        // 3. Send confirmation email
        const emailResponse = await mailSender(
          enrollStudent.email,
          "Congratulations",
          "You have successfully enrolled in a new course."
        );

        console.log("Mail response:", emailResponse);

        return res.status(200).json({
          success: true,
          message: "Signature verified and course added successfully",
        });
      } catch (error) {
        console.error("Error during enrollment:", error);
        return res.status(500).json({
          success: false,
          message: "Error while enrolling the student",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Error verifying signature:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying the payment signature",
    });
  }
};
