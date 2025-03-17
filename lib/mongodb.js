import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to MongoDB");
    return mongoose.connection.db;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
    return conn.connection.db; // <-- Return the database instance
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err;
  }
};

export default connectDB;
