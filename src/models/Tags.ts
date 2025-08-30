import mongoose, { model, Schema } from "mongoose";

interface ITag {
    name: string;
    description: string;
    courses: mongoose.Types.ObjectId;
}

const TagSchema = new Schema<ITag>({
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
    courses :  {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
}, { timestamps: true });

export const TagModel = model<ITag>("Tag", TagSchema);
