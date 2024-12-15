"use client";

import React, { useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function JobList() {
  const jobs = [
    {
      id: 1,
      title: "Front-End Developer",
      category: "Development",
      jobType: "Full Time",
      price: "GH₵ 40/hour",
    },
    {
      id: 2,
      title: "Marketing Intern",
      category: "Marketing",
      jobType: "Internship",
      price: "GH₵ 15/hour",
    },
    {
      id: 3,
      title: "Customer Support",
      category: "Support",
      jobType: "Part Time",
      price: "GH₵ 20/hour",
    },
    {
      id: 4,
      title: "Data Analyst",
      category: "Analytics",
      jobType: "Full Time",
      price: "GH₵ 35/hour",
    },
  ];

  const getJobTypeBadge = (jobType) => {
    switch (jobType) {
      case "Full Time":
        return (
          <Badge className="bg-purple-100 text-purple-800 font-semibold">
            {jobType}
          </Badge>
        );
      case "Part Time":
        return (
          <Badge className="bg-orange-100 text-orange-800 font-semibold">
            {jobType}
          </Badge>
        );
      case "Internship":
        return (
          <Badge className="bg-green-100 text-green-800 font-semibold">
            {jobType}
          </Badge>
        );
      default:
        return <Badge>{jobType}</Badge>;
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      <div className="w-full bg-white min-h-screen mx-10 my-5 rounded-lg shadow-lg">
        {/* Job List Title */}
        <h1 className="text-[50px] font-bold ml-8 mt-5 text-black">Job List</h1>

        {/* Table Section */}
        <div className="mt-5 px-6">
          <div className="bg-white rounded-lg p-6 relative">
            <div className="flex justify-end mb-2">
              <Button className="bg-black hover:bg-[#2f71c7]" onPress={onOpen}>
                Add New Job
              </Button>
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
                <TableColumn>Wage|Salary /hour</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job.id}
                    className="hover:bg-gray-100 hover:text-black transition-all duration-200 font-medium"
                  >
                    <TableCell className="font-semibold">{job.title}</TableCell>
                    <TableCell>{job.category}</TableCell>
                    <TableCell>{getJobTypeBadge(job.jobType)}</TableCell>
                    <TableCell>{job.price}</TableCell>
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
                          <DropdownItem key="copy">Copy Job Link</DropdownItem>
                          <DropdownItem key="edit" showDivider>
                            Edit Job Listing
                          </DropdownItem>
                          <DropdownItem key="delete" color="danger">
                            Delete Job Listing
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

      {/* Create New Job Modal */}
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-w-lg mx-auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Job Listing
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <Input
                  label="Title"
                  placeholder="Enter job title"
                  variant="bordered"
                  required
                />

                <Select label="Job Type" variant="bordered" required>
                  <SelectItem value="Full Time">Full-Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </Select>

                <Select label="Payment Timeline" variant="bordered" required>
                  <SelectItem value="per Hour">Salary (per hour)</SelectItem>
                  <SelectItem value="per Month">Wage (per month)</SelectItem>
                </Select>

                <Input
                  label="Salary | Wage (GH₵)"
                  placeholder="Enter price"
                  type="number"
                  step="0.01"
                  variant="bordered"
                  required
                />

                {/* Upload Job Listing Image */}
                <div>
                  <label className="block text-[20px] font-semibold mb-2">
                    Listing Image:
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="bordered"
                      className="text-blue-500 border-blue-500 hover:bg-blue-100"
                    >
                      <Icon icon="mdi:upload" className="text-xl mr-2" /> Upload
                    </Button>
                    <span className="text-gray-600">No file selected</span>
                  </div>
                </div>

                <Textarea
                  label="Description"
                  placeholder="Enter job description"
                  minRows={3}
                  variant="bordered"
                  required
                />

                <Textarea
                  label="Requirements"
                  placeholder="Enter job requirements"
                  minRows={3}
                  variant="bordered"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary">Create Job Listing</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
