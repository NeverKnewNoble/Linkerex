import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const users = await User.find();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

      const newUser = await User.create({ name, email });
      return res.status(201).json(newUser);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
