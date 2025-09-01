"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseProgressModel = void 0;
const mongoose_1 = require("mongoose");
const CourseProgressSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    completedVideos: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "SubSection",
            default: [],
        },
    ],
});
exports.CourseProgressModel = (0, mongoose_1.model)("CourseProgress", CourseProgressSchema);
