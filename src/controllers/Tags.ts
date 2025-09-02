import { Request, Response } from "express";
import z, { string } from "zod";
import { TagModel } from "../models/Tags";

export const createTag = async(req : Request , res : Response) => {
    try{
             // Fetch Data
    const TagSchema = z.object({
        name: z.string(),
        description : z.string(),
    })

    const {name , description} = TagSchema.parse(req.body);

    // Both Feild are required Validation
   if(!name || !description){
       return res.status(400).json({
           success : false,
           message : "Both feilds Are Required"
       })
   }

   // Add to UserModel
   const tagDetails = await TagModel.create({
        name : name,
        description : description,z
   })
   console.log(tagDetails);
   
   // Return The Respnnse
     return res.status(200).json({
        success : true,
        message : "Tag Created Successfully",
     })
    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened while Creating  Tag....",
        })
    }
}


  //  Get All Tags Handeler Function
  export const showAllTags = async(req : Request , res : Response) => {
    try{
        // Find all Tags That have name , description
        const allTags = await TagModel.find({} , {
            name : true , 
            description : true,
        })

        return res.status(200).json({
            success : true,
            message : "All Tags Returned Successfully",
            allTags,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something wrong Happened while Getting All Tags....",
        })
    }
  }