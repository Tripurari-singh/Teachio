import { UserModel } from "../models/User";
import { categoryModel } from "../models/category";
import { CourseModel } from "../models/Course";
import { uploadImageToCloudinary } from "../utils/ImageUploader";
import z from "zod";
import mongoose from "mongoose";
import { Request , Response} from "express";
import fileUpload, { UploadedFile } from "express-fileupload";

interface FileRequest extends Request {
      files?: {
    [fieldname: string]: UploadedFile | UploadedFile[];
  };
}

interface AuthRequest extends FileRequest {
    user? :  {
        id : string,
    };
}


// To define the zod validation Implementation for a mongoose.objectId Entity...example Tag.......
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
  .transform((val) => new mongoose.Types.ObjectId(val));

// Handeler Function For creating Course
export const createCourse = async (req : AuthRequest , res : Response) => {
    try {
        // Fetch Data
    const courseDataSchema = z.object({
        courseName : z.string(),
        courseDescription : z.string(),
        whatToLearn : z.string(),
        price : z.number(),
        Tag : objectIdSchema,
    });

    const {courseName , courseDescription , whatToLearn  , price , Tag} = courseDataSchema.parse(req.body);

    // Fetch Thumbnail from file

    if(!req.files || !req.files.thumbnailImage){
        return res.status(400).json({
            success : false,
            message : "No Image Uploaded",
        })
    }
      const courseThumbnail = Array.isArray(req.files.thumbnailImage)
    ? req.files.thumbnailImage[0]
    : req.files.thumbnailImage;

    // const courseThumbnail = req?.files.thumbnailImage;

    // check for Instructor -> we also need to Store Instructor in course Hence we need to Fetch The ObjectId
    if(!req.user){
        return res.status(400).json({
            success : false,
            message : "No userId Found for Instructor.",
        })
    }
    const userId = req.user.id;
    const InstructorDetails = await UserModel.findById(userId);
    if(!InstructorDetails){
        return res.status(400).json({
            succes : false,
            message : "No Instructor Details Found"
        })
    }
    const TagDetails = await UserModel.findById(Tag);
    if(!TagDetails){
        return res.status(400).json({
            succes : false,
            message : "No Tags Details Found"
        })
    }
    
    //Upload Image to Cloudanary
    const thumbnailImage = await uploadImageToCloudinary(courseThumbnail , process.env.FOLDER_NAME ?? "default-folder");

    // Create a New Course
    const newCourse = await CourseModel.create({
        courseName,
        courseDescription,
        instructor : InstructorDetails._id,
        tag : TagDetails._id,
        whatToLearn,
        price,
        thumbnail : thumbnailImage.secure_url,
    })

    // Add this course in User schema of Instructor
    await UserModel.findByIdAndUpdate(
        {_id : InstructorDetails._id},
        {
            $push : {
                courses : newCourse._id,
            }
        },
        {
            new : true
        }
    )

    // Update Tag schema
    await UserModel.findByIdAndUpdate(
        {_id : TagDetails._id},
        {
            $push : {
                courses : newCourse._id,
            }
        },
        {
            new : true
        }
    )


    // Return Response
    return res.status(200).json({
        success : true,
        message : "Cource Added Successfully",
        data : newCourse,
    })

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : "Something Happened in Course Creation Handeler"
        })
    }     
}

// Get all cources Handeler Function
export const getAllCources = async (req : Request , res : Response) => {
    try{
        const allCources = await CourseModel.find({} , {
            courseName : true,
            courseDescription : true,
            thumbnail : true,
            instructor : true,
            ratingAndReviews : true,
            studentsEnrolled : true,
        }).populate("instructor").exec();


        return res.status(200).json({
            success : true,
            message : "Data Fetched Successfully",
            data : allCources,
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            succes : false,
            message : "Something wrong Happened while Feching Cources",
        })
    }
}