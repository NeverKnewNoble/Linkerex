import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const job = await Job.findById(id);
      return res.status(200).json(job);
    }

    if (req.method === "PUT") {
      const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(job);
    }

    if (req.method === "DELETE") {
      await Job.findByIdAndDelete(id);
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("❌ API error:", error.message);
    return res.status(500).json({ error: "Failed to process request" });
  }
}


