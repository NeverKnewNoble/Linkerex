import axios from "axios";
import fs from "fs";
import formidable from "formidable";
import FormData from "form-data"; // ✅ Explicitly import form-data

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

    const file = files.cv[0]; // ✅ Get the first file object
    const fileStream = fs.createReadStream(file.filepath); // ✅ Read from correct file path

    const formData = new FormData();
    formData.append("cv", fileStream, file.originalFilename); // ✅ Correct filename
    formData.append("jobId", fields.jobId[0]); // ✅ Extract values correctly
    formData.append("studentId", fields.studentId[0]);
    formData.append("createdBy", fields.createdBy[0]);
    formData.append("coverLetter", fields.coverLetter[0]);

    const response = await axios.post(`${process.env.BACKEND_URL}/api/applied/apply`, formData, {
      headers: formData.getHeaders(), // ✅ Set correct headers dynamically
    });

    console.log("✅ Backend Response:", response.data);
    res.status(201).json(response.data);
  } catch (error) {
    console.error("❌ Error applying for job:", error.message);
    res.status(500).json({ error: "Failed to submit application" });
  }
}
