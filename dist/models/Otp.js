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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const MailSender_1 = require("../utils/MailSender");
const OtpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});
// a Function to send Emails
function SendVerificationMail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, MailSender_1.mailSender)(email, "Verification Email From Teachio", otp);
            console.log("Email Send Successfully : ", mailResponse);
        }
        catch (error) {
            console.log("Error Occured While sending the mail : ", error);
            throw error;
        }
    });
}
// Pre Save Hook => Runs before an operation.
OtpSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SendVerificationMail(this.email, this.otp);
        next();
    });
});
exports.OtpModel = (0, mongoose_1.model)("Otp", OtpSchema);
