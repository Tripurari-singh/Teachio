import mongoose, { model, Schema } from "mongoose";
import { mailSender } from "../utils/MailSender";

interface IOtp {
    email: string;
    otp: string;
    createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});



// a Function to send Emails
async function SendVerificationMail(email : string , otp : string){
    try{
        const mailResponse = await mailSender(email , "Verification Email From Teachio", otp );
        console.log("Email Send Successfully : ",mailResponse);
    }
    catch(error : any){
        console.log("Error Occured While sending the mail : " , error);
        throw error;
    }
}

export const OtpModel = model<IOtp>("Otp", OtpSchema);
