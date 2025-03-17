import axios from "axios";

export default async function handler(req, res) {
  try {
    // Fetch from backend using private BACKEND_URL (safe!)
    const { data } = await axios.get(`${process.env.BACKEND_URL}/api/applied`);
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}