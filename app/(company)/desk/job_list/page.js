"use client";

import React, { useState, useEffect } from "react";
import Loading from "../../../loading";
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
        const response = await axios.get("http://localhost:5000/api/jobs");
        console.log("API Response:", response.data);

        if (session?.user?.id) {
          const filteredJobs = response.data.filter(
            (job) => job.createdby === session.user.id
          );
          console.log("Filtered Jobs:", filteredJobs);
          setJobs(filteredJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err.message);
      }
    };

    if (session) {
      console.log("Session data:", session); // Debug session
      fetchJobs();
    }
  }, [session]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      <div className="w-full bg-white min-h-screen mx-10 my-5 rounded-lg shadow-lg">
        <h1 className="text-[50px] font-bold ml-8 mt-5 text-black">Job List</h1>
        <div className="mt-5 px-6">
          <div className="bg-white rounded-lg p-6 relative">
            <div className="flex justify-end mb-2">
              <Link href={"/desk/job_list/create-job"}>
                <Button className="bg-black hover:bg-[#2f71c7]">Add New Job</Button>
              </Link>
            </div>
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
                          <DropdownItem key="edit">
                            <Link href={`/desk/job_list/edit_job?id=${job._id}`}>
                              Edit Job Listing
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
