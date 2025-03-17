import axios from "axios";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data"; // Import the form-data library

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// Middleware to handle file uploads
const multerUpload = upload.single("file");

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/api/applied/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.error("API error:", error.message);
      res.status(404).json({ error: "Applied Job Not Found" });
    }
  } else if (req.method === "PUT") {
    // Use multer to parse the request
    multerUpload(req, res, async (err) => {
      if (err) {
        console.error("Multer error:", err.message);
        return res.status(500).json({ error: "Failed to process file upload" });
      }

      try {
        const formData = new FormData(); // Use the form-data library
        formData.append("coverLetter", req.body.coverLetter);

        if (req.file) {
          formData.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
          });
        }

        const { data } = await axios.put(`${process.env.BACKEND_URL}/api/applied/${id}`, formData, {
          headers: {
            ...formData.getHeaders(), // Use getHeaders from the form-data library
          },
        });

        res.status(200).json(data);
      } catch (error) {
        console.error("API error:", error.message);
        res.status(500).json({ error: "Failed to update application" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      await axios.delete(`${process.env.BACKEND_URL}/api/applied/${id}`);
      res.status(200).json({ message: "Application withdrawn successfully!" });
    } catch (error) {
      console.error("API error:", error.message);
      res.status(500).json({ error: "Failed to delete application" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}