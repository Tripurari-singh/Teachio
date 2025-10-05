import jwt from "jsonwebtoken";
import { Request , Response , NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
// import { JwtPayload } from "jsonwebtoken";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: string | JwtPayload; 
//   }
// }


// Auth
export const auth = async (req : Request , res : Response , next : NextFunction) => {
    try{
        
    const token = req.body.token ||
                  req.cookies.token ||
                  req.header("Authorisation")?.replace("Bearer" , "");
    if(!token){
        return res.status(403).json({
            success : false,
            message : "Token is Missing"
        })
    }
    // verify The Token
    try{
        const decode = await jwt.verify(token , process.env.JWT_SECRET!);
        console.log(decode);
        //@ts-ignore
        req.user = decode;
    }catch(error){
        //verification Error
        return res.status(401).json({
            success : false,
            message : "Invalid Token"
        });
    }

    next();
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something Gone Wrong while validating the Token..."
        }); 
    }
    
} 

// Is Student
export const isStudent = async (req : Request , res : Response , next : NextFunction) => {
    try{
        //@ts-ignore
         if(req.user.accountType !== "student"){
            return res.status(400).json({
                success : false,
                message : "Thsi is a Protected Route For students"
            })
         }
         next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success  : false,
            message : "User Role/accountType Not Defined",
        })
    }
}
// Is Instrutor
export const isInstructor = async (req : Request , res : Response , next : NextFunction) => {
    try{
        //@ts-ignore
         if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success : false,
                message : "Thsi is a Protected Route For Instructors"
            })
         }
         next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success  : false,
            message : "User Role/accountType Not Defined",
        })
    }
}

// Is Admin
export const IsAdmin = async (req : Request , res : Response , next : NextFunction) => {
    try{
        //@ts-ignore
         if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success : false,
                message : "Thsi is a Protected Route For Admins"
            })
         }
         next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success  : false,
            message : "User Role/accountType Not Defined",
        })
    }
}

