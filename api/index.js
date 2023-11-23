import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// ======================== Utils ========================

dotenv.config();
const app = express();
const port = process.env.PORT;

// ======================== Middlewares ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================== Routers ========================
app.get("/test", (req, res) => {
  res.send("Server is running");
});

// ======================== Error Handler ========================

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
