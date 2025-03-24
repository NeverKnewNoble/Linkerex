import path from "path";
import formidable from "formidable";
import connectDB from "@/lib/mongodb";
import AppliedJob from "@/models/AppliedJobs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await connectDB();

  try {
    const form = formidable({
      uploadDir: "./uploads",
      keepExtensions: true,
      multiples: false,
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    console.log("✅ Fields:", fields);
    console.log("✅ Files:", files);

    if (!fields.jobId || !fields.studentId || !fields.createdBy || !fields.coverLetter) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!files.cv || files.cv.length === 0) {
      return res.status(400).json({ error: "No CV uploaded." });
    }

    const file = files.cv[0];
    const filename = path.basename(file.filepath); // Extract only the filename
    

    const newApplication = new AppliedJob({
      jobId: fields.jobId[0],
      studentId: fields.studentId[0],
      createdBy: fields.createdBy[0],
      applicationDetails: {
        coverLetter: fields.coverLetter[0],
        uploadedFile: filename, 
      },
    });

    await newApplication.save();

    console.log("✅ Application saved to DB:", newApplication);

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error applying for job:", error.message);
    res.status(500).json({ error: "Failed to submit application" });
  }
}
