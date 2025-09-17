"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = exports.isInstructor = exports.isStudent = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import { JwtPayload } from "jsonwebtoken";
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: string | JwtPayload; 
//   }
// }
// Auth
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.body.token ||
            req.cookies.token ||
            ((_a = req.header("Authorisation")) === null || _a === void 0 ? void 0 : _a.replace("Bearer", ""));
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token is Missing"
            });
        }
        // verify The Token
        try {
            const decode = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            //@ts-ignore
            req.user = decode;
        }
        catch (error) {
            //verification Error
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Gone Wrong while validating the Token..."
        });
    }
});
exports.auth = auth;
// Is Student
const isStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        if (req.user.accountType !== "student") {
            return res.status(400).json({
                success: false,
                message: "Thsi is a Protected Route For students"
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Role/accountType Not Defined",
        });
    }
});
exports.isStudent = isStudent;
// Is Instrutor
const isInstructor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        if (req.user.accountType !== "Instructor") {
            return res.status(400).json({
                success: false,
                message: "Thsi is a Protected Route For Instructors"
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Role/accountType Not Defined",
        });
    }
});
exports.isInstructor = isInstructor;
// Is Admin
const IsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        if (req.user.accountType !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "Thsi is a Protected Route For Admins"
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Role/accountType Not Defined",
        });
    }
});
exports.IsAdmin = IsAdmin;
