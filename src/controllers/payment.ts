import { instance } from "../config/razorpay";
import { CourseModel } from "../models/Course";
import { UserModel } from "../models/User";
import { courseEnrollmentEmail } from "../Mail/courseEnrollementemail";
import { Request , Response } from "express";

// Capture the payment and initalise the Razorpau Order
export const capturePayment = async(req : Request , res : Response) => {
    // Get courseId / userId
    // Validation
    // valid courseId
    // Valid CoureDetails
    // User Already pay for same course
    // Orser Create
    // Response
}