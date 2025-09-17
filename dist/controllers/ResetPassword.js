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
exports.resetPassword = exports.resetPasswordExpires = void 0;
const User_1 = require("../models/User");
const MailSender_1 = require("../utils/MailSender");
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPasswordExpires = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get email
        const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
        // Email validation
        const user = yield User_1.UserModel.findOne({ email });
        // Generate Token
        const token = crypto.randomUUID;
        // Update UserModel by adding token and expiration Time
        const updatedDetails = yield User_1.UserModel.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 3 * 60 * 1000,
        }, {
            // It Actually Updates The Model
            new: true
        });
        // Create URL
        const url = `http://localhost:3000/update-password/${token}`;
        // Send Mail Containing URL
        yield (0, MailSender_1.mailSender)(email, "password Reset Link", `Password Reset Link : ${url}`);
        // REtuen Response 
        return res.status(200).json({
            success: true,
            message: "Password Chenged Successfully",
            data: updatedDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Wrong happened while Reseting Password"
        });
    }
});
exports.resetPasswordExpires = resetPasswordExpires;
//Reset Password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Data Fetch
        const { password, confirmPasswod, token } = req.body || ((_a = req.header("Authorisation")) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "")) || req.cookies.token;
        // Validation
        if (password != confirmPasswod) {
            return res.status(401).json({
                success: false,
                message: "password and confirmPassword should not be same..",
            });
        }
        // Get userDeatils from UserModel using token
        const UserDetails = yield User_1.UserModel.findOne({ token: token });
        // if No UserDetails present that means Invalid Token
        if (!UserDetails) {
            return res.status(402).json({
                success: false,
                message: "User Not Found / Invalid Token",
            });
        }
        // Token Time Check
        if (UserDetails.resetPasswordExpires.getTime() < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "TokenHas been Expired"
            });
        }
        // Hash The Pssword and Update the Password in UserModel
        const HashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield User_1.UserModel.findOneAndUpdate({ token: token }, {
            password: HashedPassword
        }, {
            // It actually Updated The Password in The Database
            new: true
        });
        // Return Response 
        return res.status(200).json({
            success: true,
            message: "Password Updated Succcessfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Somethingh wrong Happened while Reseting The password From The Actual Interface......"
        });
    }
});
exports.resetPassword = resetPassword;
