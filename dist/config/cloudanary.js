"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConnect = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinaryConnect = () => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log(" Cloudinary connected successfully");
    }
    catch (error) {
        console.error(" Cloudinary connection failed:", error);
    }
};
exports.cloudinaryConnect = cloudinaryConnect;
