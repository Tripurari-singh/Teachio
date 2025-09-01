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
exports.Signup = exports.sendOTP = void 0;
const User_1 = require("../models/User");
const Otp_1 = require("../models/Otp");
const otp_generator_1 = __importDefault(require("otp-generator"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//send Otp
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if the user Is already present
        const checkUserPresent = yield User_1.UserModel.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "user Already Exist"
            });
        }
        // Generate Otp
        var otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("Generated-otp : ", otp);
        // Check That OTP is Unique or Not....
        var result = yield Otp_1.OtpModel.findOne({ otp: otp });
        // Generating a New Otp and passing it to make Unique
        while (result) {
            var otp = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = yield Otp_1.OtpModel.findOne({ otp: otp });
        }
        // Adding ( email , otp ) to Database....
        const otpBody = yield Otp_1.OtpModel.create({
            email: email,
            otp: otp
        });
        res.status(200).json({
            success: true,
            message: "Otp Send Successfully",
            otp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.sendOTP = sendOTP;
// Signup
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Zod Validation
        const SignupSchema = zod_1.default.object({
            firstName: zod_1.default.string().min(3).max(15),
            lastName: zod_1.default.string().min(3).max(15),
            email: zod_1.default.string().email().min(3).max(15),
            password: zod_1.default.string().min(3).max(15),
            confirmPasswod: zod_1.default.string().min(3).max(15),
            accountType: zod_1.default.string().min(3).max(15),
            contactNumber: zod_1.default.number(),
            otp: zod_1.default.string(),
        });
        // Input
        const { firstName, lastName, email, password, confirmPasswod, accountType, contactNumber, otp } = SignupSchema.parse(req.body);
        // Confirm Password
        if (password !== confirmPasswod) {
            return res.status(403).json({
                success: false,
                message: "Password and Confirmed_Password Should be Same",
            });
        }
        //Check If user Already Exist
        const userExist = yield User_1.UserModel.findOne({ email });
        if (userExist) {
            return res.status(402).json({
                success: false,
                message: "User Already Exist",
            });
        }
        // Findin Most Recent otp stored for the user
        const recentOtp = yield Otp_1.OtpModel.findOne({ otp }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
        if (!recentOtp) {
            //Otp Not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found"
            });
            // OTP Not Matched
        }
        else if (otp !== recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid Otp Entered"
            });
        }
        //Hashing the password
        const HashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Enter In Database
        const UserDetails = yield User_1.UserModel.create({
            firstName,
            lastName,
            email,
            password: HashedPassword,
            accountType,
            contactNumber,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.Signup = Signup;
