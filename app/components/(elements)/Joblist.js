import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { Pagination } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const Joblist = ({ searchQuery, filters }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Store applied jobs data
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;
  const { data: session } = useSession();

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err.message);
    }
  };

  // Fetch applied jobs for the logged-in user
  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applied");
      setAppliedJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch applied jobs:", err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    if (session?.user?.id) {
      fetchAppliedJobs();
    }
  }, [session]);

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = searchQuery
      ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesChips = filters.chips.length
      ? filters.chips.some((chip) =>
          job.title.toLowerCase().includes(chip.toLowerCase())
        )
      : true;

    const matchesJobType = filters.jobTypes.length
      ? filters.jobTypes.includes(job.jobType)
      : true;

    return matchesQuery && matchesChips && matchesJobType;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      <section className="bg-white py-12 px-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Explore Opportunities
          </h1>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentJobs.map((job) => (
                <JobCard
                  key={job._id}
                  id={job._id} // Pass the job ID
                  {...job}
                  appliedJobs={appliedJobs} // Pass applied jobs data
                  userId={session?.user?.id} // Pass the logged-in user ID
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-lg mt-10">
              No Jobs Available
            </div>
          )}
        </div>

        {filteredJobs.length > 0 && (
          <div className="flex align-middle justify-center mt-10">
            <Pagination
              initialPage={1}
              total={Math.ceil(filteredJobs.length / jobsPerPage)}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Joblist;