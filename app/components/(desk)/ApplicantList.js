"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import ApplicantCard from "./ApplicantCard";
import Loading from "../../loading";

const ApplicantList = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantCardInfo = async () => {
      try {
        setLoading(true);

        const appliedJobsResponse = await axios.get("/api/applied");
        const appliedJobs = appliedJobsResponse.data;

        const userResponse = await axios.get("/api/users");
        const users = userResponse.data;

        const jobResponse = await axios.get("/api/jobs");
        const jobList = jobResponse.data;

        const SpecificToCreater = appliedJobs.filter(
          (appliedJob) => appliedJob.createdBy === session?.user?.id && appliedJob.studentAction === "Submitted"
        );

        const mergedInfo = SpecificToCreater.map((appliedJob) => {
          const userInfo = users.find(info => info._id === appliedJob.studentId) || {};
          const jobInfo = jobList.find(info => info._id === appliedJob.jobId) || {};

          return {
            ...appliedJob,
            appliedId: appliedJob._id,
            ...userInfo,
            ...jobInfo,
          };
        });

        setCardInfo(mergedInfo);
        
        // ✅ Store count in sessionStorage so it's available for Dashboard
        sessionStorage.setItem("applicantCount", mergedInfo.length.toString());

        //  **Properly filter mergedInfo for each status
        sessionStorage.setItem("pendingCardCount", 
          mergedInfo.filter(job => job.status === "Pending").length.toString()
        );

        sessionStorage.setItem("interviewCardCount", 
          mergedInfo.filter(job => job.status === "Interview Scheduled").length.toString()
        );

        sessionStorage.setItem("acceptedCardCount", 
          mergedInfo.filter(job => job.status === "Accepted").length.toString()
        );

        sessionStorage.setItem("rejectedCardCount", 
          mergedInfo.filter(job => job.status === "Rejected").length.toString()
        );

      } catch (err) {
        console.error("Failed to fetch data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchApplicantCardInfo();
    }
  }, [session]);

  if (loading) return <Loading />;

  return (
    <div className="p-2 md:p-4">
      {cardInfo.length === 0 ? (
        <div className="text-center border border-gray-300 bg-white text-black text-xl md:text-[50px] py-10 md:py-[100px] rounded-lg mt-10 md:mt-20 mx-2 md:mx-[5px] font-semibold">
          No Applications Sent.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cardInfo.map((applicant, index) => (
            <ApplicantCard
              key={index}
              status={applicant.status}
              appliedId={applicant.appliedId}
              name={applicant.username}
              email={applicant.email}
              jobCategory={applicant.category}
              jobTitle={applicant.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantList;