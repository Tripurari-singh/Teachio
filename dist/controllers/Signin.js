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
exports.SignIn = void 0;
const User_1 = require("../models/User");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validation
        const SigninSchema = zod_1.default.object({
            email: zod_1.default.email().min(3).max(15),
            password: zod_1.default.string().min(3).max(15),
        });
        // Get Data
        const { email, password } = SigninSchema.parse(req.body);
        // Check User Exist or not
        const userExist = yield User_1.UserModel.findOne({ email: email }).populate("additionalDetals");
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid User",
            });
        }
        // Generate Jwt Token , After Matching Password
        //Matching password
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, userExist.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const payload = {
            email: userExist.email,
            id: userExist._id,
            accountType: userExist.accountType,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });
        // Send Token and Response.. 
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Signedin SuccessFully",
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Signin Failed Completely"
        });
    }
});
exports.SignIn = SignIn;
