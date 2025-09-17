"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Import your routes
const courseRoute_1 = __importDefault(require("./Routes/courseRoute"));
const ProfileRoute_1 = __importDefault(require("./Routes/ProfileRoute"));
const userRoute_1 = __importDefault(require("./Routes/userRoute")); // auth routes
// Import DB connection
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api/v1/course", courseRoute_1.default);
app.use("/api/v1/profile", ProfileRoute_1.default);
app.use("/api/v1/user", userRoute_1.default);
// Test route
app.get("/", (req, res) => {
    res.send("Server is running...");
});
// Connect to DB then start server
const PORT = process.env.PORT || 5000;
(0, database_1.connect)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error(" Failed to connect to DB:", err);
});
