import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ======================== Utils ========================
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

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
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// ======================== Error Handler ========================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error !";

  return res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
