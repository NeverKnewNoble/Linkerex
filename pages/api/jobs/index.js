import axios from "axios";

export default async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL;
  
  try {
    if (req.method === "GET") {
      const { data } = await axios.get(`${BACKEND_URL}/api/jobs`);
      res.status(200).json(data);
    } 
    else if (req.method === "POST") {
      const { data } = await axios.post(`${BACKEND_URL}/api/jobs`, req.body, {
        headers: { "Content-Type": "application/json" },
      });
      res.status(201).json(data);
    } 
    else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("❌ API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
}
