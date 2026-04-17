import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bocadeliDB");
    console.log("DB is connected");
  } catch (error) {
    console.log("Error DB:", error);
  }
}
