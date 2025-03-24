import connectDB from "@/lib/mongodb";
import AppliedJob from "@/models/AppliedJobs";

export default async function handler(req, res) {
  await connectDB();

  try {
    const applications = await AppliedJob.find();
    return res.status(200).json(applications);
  } catch (error) {
    console.error("API error:", error.message);
    return res.status(500).json({ error: "Failed to fetch applications" });
  }
}

