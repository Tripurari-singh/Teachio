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