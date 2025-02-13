const express = require("express");
const multer = require("multer");
const AppliedJobs = require("../models/AppliedJobs"); // Import your schema
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();




// ? Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Add a unique prefix to the file name
  },
});

// ? File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed."), false);
  }
};

// **Initialize Multer with the storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});




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

// **Middleware to ensure DB connection
const ensureDbConnection = async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection error" });
  }
};

// **Apply DB connection middleware
router.use(ensureDbConnection);





// ! Routes to handle file upload and job application
// **POST
router.post("/apply", upload.single("cv"), async (req, res) => {
  try {
    const { jobId, studentId, createdBy, coverLetter } = req.body;

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Create a new AppliedJobs document
    const appliedJob = new AppliedJobs({
      jobId,
      studentId,
      createdBy,
      applicationDetails: {
        uploadedFile: req.file.path, // Save the file path
        coverLetter,
      },
      status: "Pending",
      studentAction: "Submitted",
    });

    // Save the document to the database
    await appliedJob.save();

    res.status(201).json({ message: "Application submitted successfully!", appliedJob });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Failed to submit application.", error: err.message });
  }
});

// **GET
router.get("/", async (req, res) => {
  try {
    const allAppliedJobs = await AppliedJobs.find({});
    res.status(200).json(allAppliedJobs);
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    res.status(500).json({ message: "Failed to fetch applied jobs.", error: err.message });
  }
});


// **GET The applied Job by ID
router.get("/:appliedId", async (req, res) => {
  const { appliedId } = req.params;
  
  try {
    const appliedJob = await AppliedJobs.findById(appliedId); // ✅ Fix: Use `AppliedJobs`
    
    if (!appliedJob) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    res.status(200).json(appliedJob);
  } catch (error) {
    console.error("Error fetching application:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// **PUT/UPDATE **where the id is the applied id not the jobid**
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter } = req.body;
    const file = req.file;

    // Check if the applied job exists
    const appliedJob = await AppliedJobs.findById(id);
    if (!appliedJob) {
      return res.status(404).json({ error: "Applied Job Not Found!" });
    }

    // Prepare the update object
    const updateData = {
      "applicationDetails.coverLetter": coverLetter,
    };

    // If a new file is uploaded, update the file path
    if (file) {
      updateData["applicationDetails.uploadedFile"] = file.path;
    }

    // Update the applied job
    const updatedJob = await AppliedJobs.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Proposal updated successfully!", updatedJob });
  } catch (err) {
    console.error("Failed to update job:", err);
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});



module.exports = router;