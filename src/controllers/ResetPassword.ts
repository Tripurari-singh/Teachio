import { UserModel } from "../models/User";
import { mailSender } from "../utils/MailSender";

export const resetPasswordExpires = async (req : Request , res : Response) => {
    // Get email
    const email = req.body;
    // Email validation
    const user = await UserModel.findOne({email})
    // Generate Token
    const token = crypto.randomUUID;
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
    
    // REtuen Response 
    
    
}