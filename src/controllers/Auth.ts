import { UserModel } from "../models/User";
import { OtpModel } from "../models/Otp";
import { Request , Response} from "express";
import OtpGenerator from "otp-generator";
import z, { success } from "zod";
import bcrypt from "bcrypt";
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

// Signup

export const Signup = async (req : Request , res  : Response) => {
    try{

        //Zod Validation
        const SignupSchema = z.object({
            firstName : z.string().min(3).max(15),
            lastName : z.string().min(3).max(15),
            email : z.string().email().min(3).max(15),
            password : z.string().min(3).max(15),
            confirmPasswod : z.string().min(3).max(15),
            accountType : z.string().min(3).max(15),
            contactNumber : z.number(),
            otp : z.string(),
        })
        
        // Input
        const {firstName, lastName, email, password, confirmPasswod, accountType,contactNumber, otp} = SignupSchema.parse(req.body);    
        
        // Confirm Password
        if(password !== confirmPasswod){
            return res.status(403).json({
                success : false,
                message : "Password and Confirmed_Password Should be Same",
            })
        }
        
        //Check If user Already Exist
        const userExist = await UserModel.findOne({email});

        if(userExist){
            return res.status(402).json({
                success : false,
                message : "User Already Exist",
            })
        }

        // Findin Most Recent otp stored for the user
        const recentOtp = await OtpModel.findOne({otp}).sort({createdAt : -1}).limit(1);
        console.log(recentOtp);

        if(!recentOtp){
            //Otp Not found
            return res.status(400).json({
                success : false,
                message : "OTP Not Found"
            })
            // OTP Not Matched
        }else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success : false,
                message : "Invalid Otp Entered"
            })
        }


        //Hashing the password
        const HashedPassword  = await bcrypt.hash(password , 10);

        // Enter In Database

        const UserDetails = await UserModel.create({
            firstName, 
            lastName, 
            email, 
            password : HashedPassword, 
            accountType,
            contactNumber,
        })


    }
    catch(error : any){
        console.log(error);
        res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}