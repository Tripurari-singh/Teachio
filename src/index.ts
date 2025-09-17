import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import your routes
import coursesRoutes from "./Routes/courseRoute";
import profileRoutes from "./Routes/ProfileRoute";
import userRoutes from "./Routes/userRoute";   // auth routes

// Import DB connection
import { connect } from "./config/database";

dotenv.config();
const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/course", coursesRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/user", userRoutes);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// Connect to DB then start server
const PORT = process.env.PORT || 5000;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to DB:", err);
  });
