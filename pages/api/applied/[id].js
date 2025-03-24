import multer from "multer";
import connectDB from "@/lib/mongodb";
import AppliedJob from "@/models/AppliedJobs";

const storage = multer.diskStorage({
  destination: "./uploads", // Save files in the uploads folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
});

// Convert multer to a Promise-based middleware
const multerUpload = (req, res) =>
  new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const jobApplication = await AppliedJob.findById(id);
      if (!jobApplication) {
        return res.status(404).json({ error: "Applied Job Not Found" });
      }
      return res.status(200).json(jobApplication);
    } catch (error) {
      console.error("API error:", error.message);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      await multerUpload(req, res); // Handle file upload
  
      console.log("✅ Parsed Body:", req.body);
      console.log("✅ Parsed File:", req.file);
  
      let appliedJob = await AppliedJob.findById(id);
      if (!appliedJob) {
        return res.status(404).json({ error: "Application not found" });
      }
  
      // Update cover letter
      if (!req.body.coverLetter) {
        return res.status(400).json({ error: "Cover letter is required." });
      }
      appliedJob.applicationDetails.coverLetter = req.body.coverLetter;
  
      // Update file if a new one is uploaded
      if (req.file) {
        const filename = req.file.filename; // Get saved filename
        appliedJob.applicationDetails.uploadedFile = filename; // Save only filename
      }
  
      await appliedJob.save();
  
      console.log("✅ Updated Application:", appliedJob);
      return res.status(200).json({ message: "Proposal updated successfully!", appliedJob });
    } catch (error) {
      console.error("❌ API error:", error.message);
      return res.status(500).json({ error: "Failed to update application" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedApplication = await AppliedJob.findByIdAndDelete(id);
      if (!deletedApplication) {
        return res.status(404).json({ error: "Application not found" });
      }
      return res.status(200).json({ message: "Application withdrawn successfully!" });
    } catch (error) {
      console.error("API error:", error.message);
      return res.status(500).json({ error: "Failed to delete application" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
