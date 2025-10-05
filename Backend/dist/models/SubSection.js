"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSectionModel = void 0;
const mongoose_1 = require("mongoose");
const SubSectionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    timeDuration: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
});
exports.SubSectionModel = (0, mongoose_1.model)("SubSection", SubSectionSchema);
