const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");


// Database Connection Function
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return; // Check if already connected
  try {
    await mongoose.connect("mongodb://localhost:27017/linkerex", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new Error("Database connection failed");
  }
};

// Middleware to ensure DB connection
const ensureDbConnection = async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection error" });
  }
};

// Apply DB connection middleware
router.use(ensureDbConnection);



//? Create New User Route
router.post("/", async (req, res) => {
  console.log("Request method:", req.method);
  console.log("Request body:", req.body);

  const { username, email, password, account_type, companyName, companyLocation } = req.body;

  try {
    const user = new User({ username, email, password, account_type, companyName, companyLocation });
    console.log("Saving users:", user);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ error: err.message });
  }
});


//? Get ALL Users Route
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(400).json({ error: err.message });
  }
});

//? Get a User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: err.message });
  }
});

// ? Update a User by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ error: err.message });
  }
});

// ? Delete a User by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
