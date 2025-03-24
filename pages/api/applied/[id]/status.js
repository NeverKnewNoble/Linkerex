import connectDB from "@/lib/mongodb";
import AppliedJob from "@/models/AppliedJobs";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { updateStatus } = req.body;

      const updatedApplication = await AppliedJob.findByIdAndUpdate(
        id,
        { status: updateStatus },
        { new: true }
      );

      if (!updatedApplication) {
        return res.status(404).json({ error: "Application not found" });
      }

      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error("API error:", error.message);
      res.status(500).json({ error: "Failed to update application status" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
