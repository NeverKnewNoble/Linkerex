import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query; // Extract job ID from URL
  const BACKEND_URL = process.env.BACKEND_URL;

  console.log("🔍 API called for job ID:", id, "Method:", req.method); // Debugging

  try {
    if (req.method === "GET") {
      const { data } = await axios.get(`${BACKEND_URL}/api/jobs/${id}`);
      res.status(200).json(data);
    } else if (req.method === "PUT") {
      const { data } = await axios.put(`${BACKEND_URL}/api/jobs/${id}`, req.body);
      res.status(200).json(data);
    } else if (req.method === "DELETE") {
      await axios.delete(`${BACKEND_URL}/api/jobs/${id}`);
      res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("❌ API error:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
}


