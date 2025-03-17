import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
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

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30m" });

  await PasswordReset.create({
    email,
    token,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes expiry
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset_password?token=${token}`;

  // Configure nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your Linkerex Password",
      text: `Hello,\n\nWe received a request to reset your password for your Linkerex account.\n\nIf you didn’t request this, you can ignore this email.\n\nTo reset your password, click the link below:\n\n${resetLink}\n\nThis link will expire in 30 minutes.\n\nBest,\nThe Linkerex Team`,
    });

    return res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
