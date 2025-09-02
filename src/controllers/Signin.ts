import { UserModel } from "../models/User";
import { Request , Response} from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const SignIn = async (req : Request , res : Response) => {
    try{
        // Validation
    const SigninSchema = z.object({
        email : z.email().min(3).max(15),
        password : z.string().min(3).max(15),
    })

    // Get Data
    const {email , password} = SigninSchema.parse(req.body);

    // Check User Exist or not
    const userExist = await UserModel.findOne({email : email}).populate("additionalDetals");
    if(!userExist){
        return res.status(400).json({
            success : false,
            message : "Invalid User",
        })
    }

    // Generate Jwt Token , After Matching Password

    //Matching password
    const isPasswordCorrect = await bcrypt.compare(password , userExist.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            success : false,
            message : "Invalid Password"
        })
    }
    
    const payload = {
        email : userExist.email,
        id : userExist._id,
        accountType : userExist.accountType,
    }
    const token = jwt.sign(payload ,  process.env.JWT_SECRET! , {
        expiresIn : "2h"
    })



    // Send Token and Response.. 
    const options = {
        expires : new Date(Date.now() + 3*24*60*60*1000),
        httpOnly : true
    }
    return res.cookie("token" , token , options).status(200).json({
        success : true,
        message : "Signedin SuccessFully",
        token : token,
    })
    }
    catch(error : any){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Signin Failed Completely"
        })
    }
}