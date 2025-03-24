import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).json({ error: "File path is required" });
  }

  // Define absolute path to the file inside the "public/uploads" folder
  const filePath = path.join(process.cwd(), "uploads", file);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Set headers for download
    res.setHeader("Content-Type", "application/pdf"); // Adjust content type as needed
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);

    // Stream the file to response (works in Next.js)
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("File download error:", error.message);
    res.status(500).json({ error: "Failed to download file" });
  }
}
