"use client";

import { Button, Textarea, Card, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Loading from "../../../../loading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Alert } from "@nextui-org/react";

export default function Applicants() {
  const [applicantDetails, setApplicantDetails] = useState(null);
  const { data: session } = useSession(); // ✅ Get logged-in user session
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get URL parameters
  const appliedId = searchParams.get("id");
  const [status, setStatus] = useState(""); // ✅ Track application status
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!appliedId) return;

    const fetchingDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch applied job
        const { data: appliedJobs } = await axios.get("http://localhost:5000/api/applied");
        const appliedJob = appliedJobs.find(job => job._id === appliedId);

        if (!appliedJob) {
          console.error("Application not found.");
          return;
        }

        // Extract application details correctly
        const applicationDetails = appliedJob.applicationDetails || {}; 

        // Fetch user details
        const { data: users } = await axios.get("http://localhost:5000/api/users");
        const userInfo = users.find(user => user._id === appliedJob.studentId) || {};

        // Fetch job details
        const { data: jobList } = await axios.get("http://localhost:5000/api/jobs");
        const jobInfo = jobList.find(job => job._id === appliedJob.jobId) || {};

        // Merge data
        setApplicantDetails({
          ...appliedJob,
          ...userInfo,
          ...jobInfo,
          uploadedFile: applicationDetails.uploadedFile || null, // ✅ Get uploaded file
          coverLetter: applicationDetails.coverLetter || "No Cover Letter Provided", // ✅ Get cover letter
          status: applicationDetails.status || "Pending", // ✅ Get status
        });

        setStatus(applicationDetails.status || "Pending"); // ✅ Set initial status

      } catch (err) {
        console.error("Failed to fetch data:", err.message);
        setAlert({ color: "danger", message: "Failed to update Status. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    fetchingDetails();
  }, [appliedId]);


  //* */ Update application status
  const handleStatusUpdate = async () => {
    if (!appliedId || !status) {
      console.error("No application ID or status selected.");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/applied/${appliedId}/${status}`);
  
      if (response.status === 200) {
        setAlert({ color: "success", message: "Status updated successfully!" });
      } else {
        setAlert({ color: "danger", message: "Failed to update Status. Please try again." });
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      setAlert({ color: "danger", message: "Failed to update Status. Please try again." });
    }
  };  

  // ? Loading state
  if (loading) return <Loading />;

  // ? Show error message if application not found
  if (!applicantDetails) {
    return <p className="text-center text-gray-500">Application not found.</p>;
  }



  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: "url('/linkerex/inf.jpg')" }}
    >
      {/* Alert Popup */}
      {alert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            color={alert.color}
            variant="flat"
            onClose={() => setAlert(null)}
            className="shadow-lg"
          >
            {alert.message}
          </Alert>
        </div>
      )}
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1100px] bg-white/95 dark:bg-gray-900 min-h-screen mx-6 my-8 rounded-xl shadow-2xl p-8"
      >
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-[#18181b] dark:text-white mb-8 text-center">
          Applicant Details
        </h1>

        <section className="space-y-8">
          {/* Applicant Information */}
          <Card className="p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
            <motion.h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Applicant Information
            </motion.h2>

            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Image
                  src={"/linkerex/user1.png"}
                  alt="Avatar"
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-md object-cover overflow-hidden"
                />
              </div>

              {/* User Info */}
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  Full Name:{" "}
                  <span className="text-white font-medium">{applicantDetails.username || "No Data"}</span>
                </h4>
                <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  Email:{" "}
                  <span className="text-white font-medium">{applicantDetails.email || "No Data"}</span>
                </h4>
              </div>
            </div>
          </Card>

          {/* Job Details */}
          <Card className="p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
            <motion.h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Job Title:{" "}
              <span className="text-white font-medium">{applicantDetails.title || "No Data"}</span>
            </motion.h2>
          </Card>

          {/* Application Details */}
          <Card className="p-6 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md bg-gray-100 dark:bg-gray-800">
            <motion.h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Application Details
            </motion.h2>

            <div className="space-y-6">
              {/* CV Download Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  CV Download
                </h4>
                {applicantDetails.uploadedFile ? (
                  <a
                    href={`http://localhost:5000/${applicantDetails.uploadedFile}`} // ✅ Ensure correct file path
                    download
                    className="inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                  >
                    Download CV
                  </a>
                ) : (
                  <p className="text-gray-500">No CV Uploaded</p>
                )}
              </div>

              {/* Cover Letter Section */}
              <div>
                <h4 className="whitespace-pre-line text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter
                </h4>
                <Textarea
                  placeholder="Write your cover letter here..."
                  minRows={8}
                  className="w-full text-black dark:text-white"
                  value={applicantDetails.coverLetter}
                  readOnly
                />
              </div>

              {/* Update Status Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Update Status
                </h2>

                <Select
                  placeholder="Choose application status"
                  className="w-full"
                  selectedKeys={[status]} // ✅ Ensure correct selected value
                  onSelectionChange={(keys) => setStatus([...keys][0])} // ✅ Correctly update status
                >
                  <SelectItem key="Pending">Pending</SelectItem>
                  <SelectItem key="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem key="Accepted">Accepted</SelectItem>
                  <SelectItem key="Rejected">Rejected</SelectItem>
                </Select>


                <Button 
                  onPress={handleStatusUpdate}  
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-all duration-300"
                >
                  Update Application Status
                </Button>
              </motion.div>
            </div>
          </Card>
        </section>
      </motion.div>
    </div>
  );
}
