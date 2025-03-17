import axios from "axios";

export default async function handler(req, res) {
  const BACKEND_URL = process.env.BACKEND_URL;

  try {
    if (req.method === "GET") {
      const { data } = await axios.get(`${BACKEND_URL}/api/users`);
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { body } = req;

      if (!body || !body.name || !body.email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const { data } = await axios.post(`${BACKEND_URL}/api/users`, body);
      return res.status(201).json(data);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error("❌ API Error:", error.message);

    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ error: "Backend is unreachable" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
