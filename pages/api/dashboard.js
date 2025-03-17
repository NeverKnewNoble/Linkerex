import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const db = await connectDB(); // No destructuring, since connectDB now returns the database

    const applicants = await db.collection("applied_jobs").countDocuments();
    const jobs = await db.collection("jobs").countDocuments();
    const pending = await db.collection("applied_jobs").countDocuments({ status: "Pending" });
    const interview = await db.collection("applied_jobs").countDocuments({ status: "Interview Scheduled" });
    const accepted = await db.collection("applied_jobs").countDocuments({ status: "Accepted" });
    const rejected = await db.collection("applied_jobs").countDocuments({ status: "Rejected" });



    res.status(200).json({
      applicantCount: applicants,
      jobCount: jobs,
      pendingCount: pending,
      interviewCount: interview,
      acceptedCount: accepted,
      rejectedCount: rejected
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
