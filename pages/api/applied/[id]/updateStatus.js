import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query; // Get the ID from the URL
  const { updateStatus } = req.body; // Get status from the request body

  if (req.method === "PUT") {
    try {
      const { data } = await axios.put(
        `${process.env.BACKEND_URL}/api/applied/${id}`,
        { status: updateStatus } // Send as an object in body
      );
      return res.status(200).json(data);
    } catch (error) {
      console.error("API error:", error.message);
      return res.status(500).json({ error: "Failed to update application status" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
