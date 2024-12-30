import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Skip if already connected
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err;
  }
};

export default connectDB;
