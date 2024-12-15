"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const AppliedJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Front-End Developer",
      company: "Tech Solutions Inc.",
      jobType: "Full Time",
      status: "Pending",
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Creative Minds Ltd.",
      jobType: "Internship",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      title: "Customer Support",
      company: "ServiceCo",
      jobType: "Part Time",
      status: "Accepted",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Insight Analytics",
      jobType: "Full Time",
      status: "Rejected",
    },
  ];

  const getStatusBadge = (status) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      case "Interview Scheduled":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
      case "Accepted":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "Rejected":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }

    return (
      <div
        className={`py-2 px-4 rounded-full font-semibold ${bgColor} ${textColor}`}
      >
        {status}
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-cover bg-center bg-white py-10"
    style={{
      backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
    }}
    >
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Applied Jobs</h1>
          <p className="text-white mt-2">Track the status of all your applications in one place.</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg p-6">
          <Table
            aria-label="Applied Jobs Table"
            lined
            headerLined
            shadow={false}
            className="rounded-lg overflow-hidden"
          >
            <TableHeader>
              <TableColumn className="font-semibold text-white">Title</TableColumn>
              <TableColumn className="font-semibold text-white">Company</TableColumn>
              <TableColumn className="font-semibold text-white">Job Type</TableColumn>
              <TableColumn className="font-semibold text-white">Application Status</TableColumn>
              <TableColumn className="font-semibold text-white">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-100 transition-all duration-200 text-white font-semibold hover:text-black"
                >
                  <TableCell className="font-semibold">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>
                    <Badge>{job.jobType}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          variant="flat"
                          className="text-black bg-gray-100 hover:bg-black hover:text-white"
                        >
                          +
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Actions">
                        <DropdownItem key="copy">Copy Job Link</DropdownItem>
                        <DropdownItem key="edit" showDivider>
                          Edit Proposal
                        </DropdownItem>
                        <DropdownItem key="delete" color="danger">
                          Withdraw Application
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
  );
};

export default AppliedJobs;
