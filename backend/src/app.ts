import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
