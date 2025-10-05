import mongoose, { model, Schema } from "mongoose";

interface IRatingAndReview {
    user: mongoose.Types.ObjectId;
    rating: number;
    review: string;
    course : mongoose.Types.ObjectId,
}

const RatingAndReviewSchema = new Schema<IRatingAndReview>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Course",
        index : true
    }
}, { timestamps: true });

export const RatingAndReviewModel = model<IRatingAndReview>("RatingAndReview", RatingAndReviewSchema);
