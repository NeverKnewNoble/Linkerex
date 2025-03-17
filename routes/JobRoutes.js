const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("../models/Job");
require("dotenv").config();


// ? Database Connection Function
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return; // Check if already connected
  try {
    await mongoose.connect(process.env.MONGO_URI, {
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


//! Routes
//? 1. Create a new Job
router.post("/", async (req, res) => {
    try {
      const { title, company, location, category, jobType, paymentTimeline, amount, description, requirements, createdby } = req.body;
  
      const job = new Job({
        title,
        company,
        location,
        category,
        jobType,
        paymentTimeline,
        amount,
        description,
        requirements,
        createdby,
      });

    
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      console.error("Error Creating Job:", err.message);
      res.status(400).json({ error: err.message });
    }
  });
  

//? 2. Get All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(400).json({ error: err.message });
  }
});


//? 3. Update a Job
router.put("/:id", async (req, res) => {
  try {

    console.log("🔄 Update Request Received:", req.params.id, req.body);

    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found!" });
    }

    res.json(job);
  } catch (err) {
    console.error("Failed to update job:", err.message);
    res.status(400).json({ error: err.message });
  }
});


//? 4. Delete a Job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job listing not found" });
    }

    res.json({ message: "Job listing deleted successfully" });
  } catch (err) {
    console.error("Failed to delete job:", err.message);
    res.status(400).json({ error: err.message });
  }
});


// ? 5. Get Job By ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job Not Found"});
    }
    res.json(job);
  } catch (err) {
    console.error("Unable To Fetch Job", err.message);
    res.status(400).json({ message: err.message });
  }

});






module.exports = router;