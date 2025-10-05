"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    gender: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: String,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
    },
}, { timestamps: true });
exports.ProfileModel = (0, mongoose_1.model)("Profile", ProfileSchema);
