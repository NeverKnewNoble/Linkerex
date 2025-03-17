import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { updateStatus } = req.body; // ✅ Get updateStatus from request body

      const { data } = await axios.put(`${process.env.BACKEND_URL}/api/applied/${id}/status`, {
        updateStatus, // ✅ Pass the correct field to backend
      });

      res.status(200).json(data);
    } catch (error) {
      console.error("API error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: "Failed to update application status",
        details: error.response?.data || error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
