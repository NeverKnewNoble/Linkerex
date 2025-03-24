import connectDB from "@/lib/mongodb"; // Import database connection
import User from "@/models/User"; // Import User model

export default async function handler(req, res) {
  await connectDB(); // Connect to DB
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    if (req.method === "GET") {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    }

    if (req.method === "PUT") {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
