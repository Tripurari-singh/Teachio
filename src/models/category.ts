import mongoose, { model, Schema } from "mongoose";

interface Icategory {
    name: string;
    description: string;
    courses: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<Icategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    courses :  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
}, { timestamps: true });

export const categoryModel  = model<Icategory>("Tag", categorySchema);
