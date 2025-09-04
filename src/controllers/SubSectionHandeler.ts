import { SubSectionModel } from "../models/SubSection";
import { SectionModel } from "../models/Section";
import { Request , Response } from "express";
import z, { success } from "zod";
import { UploadedFile } from "express-fileupload";
import { uploadImageToCloudinary } from "../utils/ImageUploader";

interface FileRequest extends Request {
      files?: {
    [fieldname: string]: UploadedFile | UploadedFile[];
  };
}


// Create SubSection
export const createSubSection = async(req : FileRequest , res : Response) => {
    try{
        // Fetch data & Validation
        const SubSectionInputSchema = z.object({
            sectionId : z.string(),
            title : z.string(),
            timeDuration : z.string(),
            description : z.string(),
        })

        const { sectionId , title , timeDuration , description } = SubSectionInputSchema.parse(req.body);

        // Extract File
        if(!req.files || !req.files.videoFile){
            return res.status(400).json({
                success : false,
                message : "Video File Missing"
            })
        }

        const video = req.files.videoFile;

        // Some Typescript Fixxes
        let videoFile: UploadedFile;
         if (Array.isArray(req.files.videoFile)) {
             videoFile = req.files.videoFile[0]; // take the first file if multiple uploaded
         } 
         else {
             videoFile = req.files.videoFile;
         }


        // Upload video at cloudanary / fetch secure_url
        const uploadDetails = await uploadImageToCloudinary(videoFile , process.env.FOLDER_NAME ?? "default_folder");

        // Create
        const subSectionDetails = await SubSectionModel.create({
            title : title,
            description : description,
            timeDuration : timeDuration,
            videoUrl : uploadDetails.secure_url,
        })
        // update Section weith subsection => ObjectId just created

        const updatedSection = await SectionModel.findByIdAndUpdate(sectionId , {
            $push : {
                subsection : subSectionDetails._id
            }
        } , {
            new : true
        }).populate("subsection")


        // Return Response
        return res.status(200).json({
            success : true,
            message : "SubSection Created Successfully",
            data : updatedSection
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "something wrong Happened while creating The SubSection"
        })
    }
}
// Update SubSection

export const SubsectionDelete = async(req : Request , res : Response) => {
    try{
       // Fetch Data
       const SubSectionInputSchema = z.object({
            subsectionId : z.string(),
            title : z.string(),
            timeDuration : z.string(),
            description : z.string(),
        })

        const {subsectionId , title , description , timeDuration , } = SubSectionInputSchema.parse(req.body);

       // Update
       const updatedSubSectionDetails = await SubSectionModel.findByIdAndUpdate(subsectionId , {
        title,
        description,
        timeDuration
       } , {
        new : true
       })

       // Return
       return res.status(200).json({
        success : true,
        message : "SubSection Updated Suuccessully",
        data : updatedSubSectionDetails,
       })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened during Deleting a SubSection",
        })
    }
}


// Delete SubSection
export const SubsectionUpdate = async(req : Request , res : Response) => {
    try{
       // Fetch
       const { subsectionId } = req.body;

       // Delete
       await SubSectionModel.findByIdAndDelete(subsectionId);

       // Return Response
        return res.status(200).json({
        success : true,
        message : "SubSection Deleted Suuccessully",
       })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened during Updateing a SubSection",
        })
    }
}
