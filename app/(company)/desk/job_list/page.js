"use client";

import React, { useState, useEffect } from "react";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function JobList() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobs");
        // console.log("API Response:", response.data);

        if (session?.user?.id) {
          const filteredJobs = response.data.filter(
            (job) => job.createdby === session.user.id
          );
          // console.log("Filtered Jobs:", filteredJobs);
          setJobs(filteredJobs);
        }

        // ✅ Store count in sessionStorage so it's available for Dashboard
        sessionStorage.setItem("JobsCount", setJobs.length.toString());
      } catch (err) {
        // console.error("Error fetching jobs:", err.message);
      }
    };

    if (session) {
      // console.log("Session data:", session);
      fetchJobs();
    }
  }, [session]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen bg-[#18181b] bg-center flex items-center justify-center p-4"
    >
      <div className="w-full bg-[#18181b] min-h-screen mx-4 sm:mx-10 my-5 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-[50px] font-bold ml-4 sm:ml-8 mt-5 text-white">Job List</h1>
        <div className="mt-5 px-4 sm:px-6">
          <div className="bg-[#27272b] rounded-lg p-4 sm:p-6 relative">
            <div className="flex justify-end mb-4">
              <Link href={"/desk/job_list/create-job"}>
                <button className="px-4 py-2 rounded-md font-bold bg-blue-600 text-white hover:bg-white hover:border hover:text-black transition-colors ">
                Add New Job
                </button>
              </Link>
            </div>

            {/* Show 'No Jobs' message if empty */}
            {jobs.length === 0 ? (
              <div className="text-center border border-gray-300 bg-white text-black text-xl sm:text-[50px] py-[50px] sm:py-[100px] rounded-lg mt-5 mx-[5px] font-semibold">
                No Applied Jobs Created.
              </div>
            ) : (
              <Table
                aria-label="Available Job Listings"
                lined
                headerLined
                shadow={false}
                className="rounded-lg overflow-hidden"
              >
                <TableHeader>
                  <TableColumn>Title</TableColumn>
                  <TableColumn>Category</TableColumn>
                  <TableColumn>Job Type</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow
                      key={job._id}
                      className="hover:bg-gray-100 hover:text-black transition-all duration-200 font-medium"
                    >
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.category || "N/A"}</TableCell>
                      <TableCell>{job.jobType}</TableCell>
                      <TableCell>{`GH₵ ${job.amount}`}</TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              variant="flat"
                              className="text-black bg-gray-100 hover:bg-black hover:text-white border"
                            >
                              +
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Actions">
                            <DropdownItem key="edit" textValue="Edit Proposal">
                              <Link href={`/desk/job_list/edit_job?id=${job._id}`}>
                                {/* Edit Job Listing */}
                                <button className="px-4 py-2 w-full justify-start flex rounded-md font-bold bg-[#27272a] text-white hover:bg-white hover:border hover:text-black transition-colors ">
                                Edit Job Listing
                                </button>
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}