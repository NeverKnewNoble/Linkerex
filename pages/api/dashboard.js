import connectDB from "@/lib/mongodb";
import AppliedJob from "@/models/AppliedJobs";
import Job from "@/models/Job";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB(); // Connect to MongoDB

    const applicants = await AppliedJob.countDocuments();
    const jobs = await Job.countDocuments();
    const pending = await AppliedJob.countDocuments({ status: "Pending" });
    const interview = await AppliedJob.countDocuments({ status: "Interview Scheduled" });
    const accepted = await AppliedJob.countDocuments({ status: "Accepted" });
    const rejected = await AppliedJob.countDocuments({ status: "Rejected" });

    return res.status(200).json({
      applicantCount: applicants,
      jobCount: jobs,
      pendingCount: pending,
      interviewCount: interview,
      acceptedCount: accepted,
      rejectedCount: rejected,
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
