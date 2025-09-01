"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "";
dotenv_1.default.config();
console.log("server Running on port ", PORT);
console.log("Database_url:", DB_URL);
mongoose_1.default.connect(DB_URL).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Database Connection Failed ", err);
});
