import { Request , Response } from "express";
import z from "zod";
import { SectionModel } from "../models/Section";

export const createSection = async (req : Request , res : Response) => {
    try{
        // Fetch Data & Validation
        const sectionInputschema = z.object({
            sectionName : z.string(),
            courseId : z.string(),
        })

        const { sectionName , courseId } = sectionInputschema.parse(req.body);

        // Create Section
        const sectionDetails = await SectionModel.create({sectionName});

        // Update coursModel with section -> ObjectId
        const updatedCourseDetails = await SectionModel.findByIdAndUpdate( courseId  , {
            $push : {
                courseContent : sectionDetails._id,
            }
        } , {
            new : true
        })

        // Return Response
        return res.status(200).json({
            success : true,
            message : "SEction Created Successfully !",
            data : updatedCourseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened during creating a Section",
        })
    }

}

export const updateSection = async(req : Request , res : Response) => {
    try{
        // Fetch Data
        const sectionUpdateInputschema = z.object({
            sectionName : z.string(),
            sectionId : z.string(),
        })

        const { sectionName , sectionId } = sectionUpdateInputschema.parse(req.body);

        // Update 
        const updatedDetails = await SectionModel.findByIdAndUpdate(sectionId , {
            sectionName : sectionName
        } , {
            new : true
        })
        // Return response
        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully",
            data : updatedDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened during Updating a Section",
        })
    }
}

export const sectionDelete = async(req : Request , res : Response) => {
    try{
        // Fetch
        const { sectionId } = req.params;

        // Delete
        await SectionModel.findByIdAndDelete(sectionId);

        //Return Response
        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened during Deleting a Section",
        })
    }
}