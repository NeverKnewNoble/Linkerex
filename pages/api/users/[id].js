import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  const BACKEND_URL = process.env.BACKEND_URL;

  console.log("🔍 API called for User ID:", id);

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    if (req.method === "GET") {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/${id}`);
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const { body } = req;
      const { data } = await axios.put(`${BACKEND_URL}/api/users/${id}`, body);
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      await axios.delete(`${BACKEND_URL}/api/users/${id}`);
      return res.status(200).json({ message: "User deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
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
