import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI).catch((err) => {
  console.error("MongoDB connection error:", err);
});
