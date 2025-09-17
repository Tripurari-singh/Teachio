import { Request , Response } from "express";
import z from "zod";
import { ProfileModel } from "../models/Profile";
import { UserModel } from "../models/User";

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
export const updateDisplayPicture = async (req : Request , res : Response ) => {
    try{
        
    }catch(error){

    }
}
// Get all cources
