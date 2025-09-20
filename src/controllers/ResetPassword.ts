import { UserModel } from "../models/User";
import { mailSender } from "../utils/MailSender";
import { Request , Response ,  } from "express";
import bcrypt from "bcrypt";

interface ResetPasswordBody {
    email : string
}

export const resetPasswordToken = async (req : Request<{}, {}, ResetPasswordBody> , res : Response) => {
    try {
            // Get email
    const email = req.body?.email;

    // Email validation
    const user = await UserModel.findOne({email})
    console.log(user);

    // Generate Token
    const token = crypto.randomUUID();

    // Update UserModel by adding token and expiration Time
    const updatedDetails = await UserModel.findOneAndUpdate({email : email} , {
        token : token,
        resetPasswordExpires : Date.now() + 3*60*1000,
    } , {
        // It Actually Updates The Model
        new : true
    })

    // Create URL
    const url = `http://localhost:3000/update-password/${token}`;
    // Send Mail Containing URL
    await mailSender(email , "password Reset Link" , 
        `Password Reset Link : ${url}`
    )

    // REtuen Response 
    return res.status(200).json({
        success : true , 
        message : "Password Chenged Successfully",
        data : updatedDetails,
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something Wrong happened while Reseting Password"
        })
    }
}


//Reset Password
 export const resetPassword = async (req : Request , res : Response) => {
    try {
       // Data Fetch
       //    const {password , confirmPasswod , token} = req.body || req.header("Authorisation")?.replace("Bearer" , "") || req.cookies.token;


    const { password, confirmPassword, token } = req.body;

    const headerToken = req.header("Authorization")?.replace("Bearer ", "");
    
    const cookieToken = req.cookies?.token;

    const finalToken = token || headerToken || cookieToken;

       // Validation
       if(password !== confirmPassword){
          return res.status(401).json({
            success : false,
            message : "password and confirmPassword should be same..",
          })
       }

       // Get userDeatils from UserModel using token
       const UserDetails = await UserModel.findOne({token : finalToken});
       console.log(finalToken);

       // if No UserDetails present that means Invalid Token
       if(!UserDetails){
        return res.status(402).json({
            success : false,
            message : "User Not Found / Invalid Token",
        })
       }
       console.log(UserDetails);

       // Token Time Check
       if(UserDetails.resetPasswordExpires.getTime() < Date.now()){
        return res.status(403).json({
            success : false,
            message : "Token Has been Expired"
        })
       }

       // Hash The Pssword and Update the Password in UserModel
       const HashedPassword = await bcrypt.hash(password , 10);
       await UserModel.findOneAndUpdate({token : finalToken} , {
        password : HashedPassword
       } , {
        // It actually Updated The Password in The Database
        new : true
       })
       
       // Return Response 
       return res.status(200).json({
        success : true,
        message : "Password Updated Succcessfully",
       })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false , 
            message : "Somethingh wrong Happened while Reseting The password From The Actual Interface......"
        })
    }
}


