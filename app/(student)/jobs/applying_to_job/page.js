"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button, Textarea, Alert, Card, Spacer, Progress, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Loading from "../../../loading";
import { useSession } from "next-auth/react";


const ApplyingToJobs = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id"); // Get the job ID from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState(""); // State for cover letter
  const { data: session, status } = useSession();
  const [alert, setAlert] = useState(null); // Define alert state
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission status
  const [appliedData, setAppliedData] = useState(null); // Store applied job data
  const [uploadProgress, setUploadProgress] = useState(0); // Track file upload progress

  // Fetch job details
  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
          setJobDetails(response.data);
        } catch (err) {
          console.error("Failed to fetch job details:", err.message);
        }
      };

      fetchJobDetails();
    }
  }, [jobId]);

  // !Fetch applied data to check if the user has already applied
  useEffect(() => {
    const fetchAppliedData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applied");
        const appliedJobs = response.data;

        // Find the job where jobId and studentId match
        const appliedJob = appliedJobs.find(
          (job) =>
            job.jobId === jobId &&
            job.studentId === session?.user?.id &&
            job.studentAction === "Submitted"
        );

        if (appliedJob) {
          setAppliedData(appliedJob); // Store the applied job data
          setIsSubmitted(true); // Mark the form as submitted
          setCoverLetter(appliedJob.coverLetter); // Pre-fill the cover letter
        }
      } catch (err) {
        console.error("Failed to fetch applied data:", err.message);
      }
    };

    if (session?.user?.id && jobId) {
      fetchAppliedData();
    }
  }, [session, jobId]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedFile(file); // Update state with the selected file
      simulateUploadProgress(); // Simulate upload progress
    }
  };

  // Simulate file upload progress
  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  // Handle cover letter input change
  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value); // Update state with the cover letter
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        setAlert({
          color: "danger",
          message: "Please upload a CV.",
        });
        return;
      }

      if (!coverLetter) {
        setAlert({
          color: "danger",
          message: "Please write a cover letter.",
        });
        return;
      }

      // Create a FormData object
      const formData = new FormData();
      formData.append("cv", selectedFile); // Append the file
      formData.append("jobId", jobId); // Append job ID
      formData.append("studentId", session.user.id); // Append student ID
      formData.append("createdBy", jobDetails.createdby); // Append createdBy ID
      formData.append("coverLetter", coverLetter); // Append cover letter

      // Send the form data to the backend
      const response = await axios.post("http://localhost:5000/api/applied/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });

      console.log("Application submitted:", response.data);

      // Update submission status
      setIsSubmitted(true);

      // Show success alert
      setAlert({
        color: "success",
        message: "Application submitted successfully!",
      });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (err) {
      console.error("Failed to submit application:", err);

      // Show error alert
      setAlert({
        color: "danger",
        message: "Failed to submit application. Please try again.",
      });

      // Clear the alert after 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  // If in loading state, use loading screen
  if (!jobDetails) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
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
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Job Details Section */}
        <Card className="mb-8 p-6">
          <h2 className="text-3xl font-bold mb-4">{jobDetails.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
              {jobDetails.jobType}
            </span>
            {(jobDetails.jobType === "Full-Time" || jobDetails.jobType === "Part-Time") && (
              <span className="text-sm text-gray-200">GH₵ {jobDetails.amount}</span>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="whitespace-pre-line text-gray-200 pl-5">{jobDetails.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Requirements</h4>
              <p className="whitespace-pre-line text-gray-200 pl-5">{jobDetails.requirements}</p>
            </div>
          </div>
        </Card>

        {/* Apply Now Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Apply Now</h2>

          {/* File Upload Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Upload CV</label>
            <div className="flex items-center gap-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button
                  variant="bordered"
                  className="text-blue-500 border-blue-500 hover:bg-blue-100"
                  as="span"
                  isDisabled={isSubmitted}
                >
                  <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={isSubmitted}
              />
              <span className="text-gray-200">
                {selectedFile ? selectedFile.name : "No file selected"}
              </span>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress value={uploadProgress} className="mt-2" />
            )}
          </div>

          {/* Cover Letter Section */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Cover Letter</label>
            <Textarea
              placeholder="Write your cover letter here..."
              minRows={10}
              className="w-full font-white"
              value={coverLetter}
              onChange={handleCoverLetterChange}
              isDisabled={isSubmitted || session?.user?.account_type === "company" || status === "unauthenticated"}
            />
          </div>

          {/* Submit Proposal Button */}
          <div className="flex justify-center">
            {isSubmitted ? (
              <Button isDisabled color="success" className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold">
                Application Submitted
              </Button>
            ) : (
              <Button
                isDisabled={status === "unauthenticated" || session?.user?.account_type === "company"}
                color="primary"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                onClick={handleSubmit}
              >
                {status === "unauthenticated" ? "Login To Apply" : "Submit Proposal"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplyingToJobs;



