"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import ApplicantCard from "./ApplicantCard";
import Loading from "../../loading";

const ApplicantList = () => {
  const [cardInfo, setCardInfo] = useState([]); // ✅ Store merged data
  const { data: session } = useSession(); // ✅ Get logged-in user session
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const fetchApplicantCardInfo = async () => {
    try {
      setLoading(true);

      // Fetch Applied Jobs
      const appliedJobsResponse = await axios.get("http://localhost:5000/api/applied");
      const appliedJobs = appliedJobsResponse.data;

      // Fetch Users
      const userResponse = await axios.get("http://localhost:5000/api/users");
      const users = userResponse.data;

      //  Fetch Job Details
      const jobResponse = await axios.get("http://localhost:5000/api/jobs");
      const jobList = jobResponse.data; //  Renamed to avoid conflict

      //  Filter applied jobs created by the logged-in user & submitted
      const SpecificToCreater = appliedJobs.filter(
        (appliedJob) => appliedJob.createdBy === session?.user?.id && appliedJob.studentAction === "Submitted"
      );

      // Merge applied jobs with user info and job details
      const mergedInfo = SpecificToCreater.map((appliedJob) => {
        const userInfo = users.find(info => info._id === appliedJob.studentId) || {}; 
        const jobInfo = jobList.find(info => info._id === appliedJob.jobId) || {}; // ✅ Fixed .find()

        return {
          ...appliedJob, // Applied job details
          appliedId: appliedJob._id, // Preserve applied job ID
          ...userInfo, // Student details
          ...jobInfo, // Job Details
        };
      });

      // Update state with merged data
      setCardInfo(mergedInfo);
    } catch (err) {
      console.error("Failed to fetch data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount or when session changes
  useEffect(() => {
    if (session?.user?.id) {
      fetchApplicantCardInfo();
    }
  }, [session]);

  if (loading) return <Loading />; // Show loading while fetching data

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cardInfo.map((applicant, index) => (
        <ApplicantCard
          key={index}
          appliedId={applicant.appliedId}
          name={applicant.username}
          email={applicant.email}
          jobCategory={applicant.category}
          jobTitle={applicant.title}
        />
      ))}
    </div>
  );
};

export default ApplicantList;
