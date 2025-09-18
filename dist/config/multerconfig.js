"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// storage engine
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // save locally before Cloudinary upload
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // e.g. 1694959234.png
    },
});
// validate file types (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
        cb(null, true);
    }
    else {
        cb(new Error("Only .jpg, .jpeg, .png files are allowed"));
    }
};
exports.upload = (0, multer_1.default)({ storage, fileFilter });
