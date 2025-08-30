import mongoose, { Schema, model } from "mongoose";

export interface ICourseProgress {
  courseId: mongoose.Types.ObjectId;
  completedVideos: mongoose.Types.ObjectId[];
}

const CourseProgressSchema = new Schema<ICourseProgress>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubSection",
      default: [],
    },
  ],
});

export const CourseProgressModel = model<ICourseProgress>("CourseProgress",CourseProgressSchema);
