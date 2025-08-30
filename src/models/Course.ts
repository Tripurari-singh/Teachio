import mongoose, { model, Schema } from "mongoose";

interface ICourse {
    name: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    whatToLearn: string[];
    courseContent: mongoose.Types.ObjectId[];
    ratingAndReviews: mongoose.Types.ObjectId[];
    price: number;
    thumbnail: string;
    tags: mongoose.Types.ObjectId[];
    studentsEnrolled: mongoose.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatToLearn: [
        {
            type: String,
            trim: true,
        },
    ],
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    thumbnail: {
        type: String,
        trim: true,
    },

    // can be Probabally an array....
    // Need To Check
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });

export const CourseModel = model<ICourse>("Course", CourseSchema);
