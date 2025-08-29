import mongoose from "mongoose";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "";

dotenv.config();

console.log("server Running on port " , PORT);
console.log("Database_url:" , DB_URL);

mongoose.connect(DB_URL).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log("Database Connection Failed " , err);
})