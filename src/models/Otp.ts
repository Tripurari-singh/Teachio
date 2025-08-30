import mongoose, { model, Schema } from "mongoose";

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

export const OtpModel = model<IOtp>("Otp", OtpSchema);
