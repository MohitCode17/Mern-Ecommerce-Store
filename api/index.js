import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ======================== Utils ========================
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectDatabase();

// ======================== Middlewares ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================== Routers ========================
app.use("/api/auth", authRoutes);

// ======================== Error Handler ========================

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
