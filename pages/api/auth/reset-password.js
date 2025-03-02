const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; // Import mongoose
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Connect to MongoDB
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required" });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Check if token exists in DB
    const resetRecord = await PasswordReset.findOne({ token });

    if (!resetRecord) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (new Date(resetRecord.expiresAt) < new Date()) {
      await PasswordReset.deleteOne({ token }); // Cleanup expired token
      return res.status(400).json({ error: "Token has expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Delete reset token after use
    await PasswordReset.deleteOne({ token });

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(400).json({ error: "Invalid or expired token" });
  }
}
