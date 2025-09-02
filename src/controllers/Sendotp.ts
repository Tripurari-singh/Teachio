import { UserModel } from "../models/User";
import { OtpModel } from "../models/Otp";
import { Request , Response} from "express";
import OtpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();
//send Otp
export const sendOTP = async (req : Request , res : Response) => {
   try{
     const{email} = req.body;

    // Check if the user Is already present
    const checkUserPresent = await UserModel.findOne({email});

    if(checkUserPresent){
        return res.status(401).json({
            success : false,
            message : "user Already Exist"
        })
    }

    // Generate Otp
    var otp = OtpGenerator.generate(6,{
        upperCaseAlphabets : false,
        lowerCaseAlphabets : false,
        specialChars : false
    })

    console.log("Generated-otp : " , otp);

    // Check That OTP is Unique or Not....
    var result = await OtpModel.findOne({otp : otp});

    // Generating a New Otp and passing it to make Unique
    while(result){
        var otp = OtpGenerator.generate(6,{
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
        })
        result = await OtpModel.findOne({otp : otp});
    }
    
    // Adding ( email , otp ) to Database....
    const otpBody = await OtpModel.create({
        email : email,
        otp : otp
    })
    res.status(200).json({
        success : true,
        message : "Otp Send Successfully",
        otp,
    })

   }

   catch(error : any){
    console.log(error);
    res.status(500).json({
        success : false,
        message : error.message
    })
   }

}