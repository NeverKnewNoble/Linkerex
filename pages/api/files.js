import axios from "axios";

export default async function handler(req, res) {
  const { file } = req.query; // Get file path from request

  if (!file) {
    return res.status(400).json({ error: "File path is required" });
  }

  try {
    // Fetch the file from backend storage
    const response = await axios.get(`${process.env.BACKEND_URL}/${file}`, {
      responseType: "arraybuffer", // Ensure binary data is preserved
    });

    // Set correct headers for file download
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Content-Disposition", `attachment; filename="${file}"`);
    
    return res.send(response.data);
  } catch (error) {
    console.error("File download error:", error.message);
    return res.status(500).json({ error: "Failed to download file" });
  }
}
