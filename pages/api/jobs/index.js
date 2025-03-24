import connectDB from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      const jobs = await Job.find();
      return res.status(200).json(jobs);
    }

    if (req.method === "POST") {
      const newJob = await Job.create(req.body);
      return res.status(201).json(newJob);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("❌ API error:", error.message);
    return res.status(500).json({ error: "Failed to process request" });
  }
}
