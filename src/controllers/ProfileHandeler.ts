import { Request , Response } from "express";
import z from "zod";
import { ProfileModel } from "../models/Profile";
import { UserModel } from "../models/User";
import { uploadImageToCloudinary } from "../utils/ImageUploader";

export const updateProfile = async(req: Request , res : Response) => {
    try{
        // Get Data
        const ProfileInputSchema = z.object({
            dateOfBirth : z.string(),
            gender : z.string(),
            about : z.string(),
            contactNumber : z.string(),
        })

        const { dateOfBirth , gender , about , contactNumber } = ProfileInputSchema.parse(req.body);

        // Get User Id
        const userId = req.body.id;

        // Find Profile
        const userDeatils = await UserModel.findById(userId);

        const ProfileId = userDeatils?.additionalDetals;

        const ProfileDetails = await ProfileModel.findById(ProfileId);

        // Update
        const updatedProfile = await ProfileModel.findByIdAndUpdate(ProfileId , {
            dateOfBirth : dateOfBirth,
            gender  : gender,
            about : about , 
            contactNumber : contactNumber
        } , {
            new : true
        })

        // Return Response
        return res.status(200).json({
            success : true,
            message : "Profile Updated Successfully",
            data : updatedProfile,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened while Updating profile"
        })
    }
}

export const deleteProfile = async(req : Request , res : Response) => {
    try{
        // Get Data
        //@ts-ignore
        const userId = req.user.id;

        const userDetails = await UserModel.findById(userId);
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : "User Details Unable to Fetc / userId Issue",
            })
        }

        // Delete Profile
        await ProfileModel.findByIdAndDelete({_id : userDetails.additionalDetals});

        // Delete User
        await UserModel.findByIdAndDelete({_id : userId});

        // Response
        return res.status(200).json({
            success : true,
            message : "User / Profile Deleted Successfully"
        })

        //// We also Need to delete the user(Student) from the list of Enrolled students in the course Model

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened while Deleting profile"
        })
    }
}

export const getAllUserDetais = async (req : Request , res : Response) => {
    try{
        // fetch id
        //@ts-ignore
        const userId = req.user.id;

        // Get Details
        const userDetails = await UserModel.findById({id : userId}).populate("additionalDetails").exec();

        // Response
        return res.status(200).json({
            success : true,
            message : "All DEtails Fetched Successfully",
            data : userDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened while Getting All_User Details"
        })
    }
}

// update Display Picture
// Extend Express Request to include `files` and `user`
interface CustomRequest extends Request {
  files?: {
    displayPicture?: any; // can be Express.Multer.File if using Multer
  };
  user?: {
    id: string;
  };
}

export const updateDisplayPicture = async (req: Request, res: Response) => {
  try {


    // const displayPicture = req.file;
    //    if (!displayPicture) {
    //    return res.status(400).json({ success: false, message: "No file uploaded" });
    //    }

    const displayPicture = req.files?.displayPicture;
    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture provided",
      });
    }
    
    //@ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    const image = await uploadImageToCloudinary(
        //@ts-ignore
      displayPicture,
      process.env.FOLDER_NAME as string,
      1000,
      1000
    );

    const updatedProfile = await UserModel.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all cources
// Extend Request type to include `user`
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

export const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found",
      });
    }

    const userDetails = await UserModel.findOne({ _id: userId })
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

