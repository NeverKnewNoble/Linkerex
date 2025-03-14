"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  useDisclosure,
  Alert,
} from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import Joblist from "@/app/components/(elements)/Joblist";

const Jobs = () => {
  const [chipData, setChipData] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]); // State for selected job types
  const [showAlert, setShowAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [activeFilters, setActiveFilters] = useState({ chips: [], jobTypes: [] }); // Active filters
  const inputRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const toggleJobType = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const applyFilters = () => {
    setActiveFilters({ chips: chipData.map((chip) => chip.label), jobTypes: selectedJobTypes });
    onOpenChange(false); // Close the modal
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const value = inputRef.current?.value;
        if (value && value.trim() !== "") {
          if (chipData.length >= 5) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Auto-hide after 3 seconds
            return;
          }
          setChipData((prevData) => [
            ...prevData,
            { key: prevData.length, label: value.trim() },
          ]);
          if (inputRef.current) {
            inputRef.current.value = ""; // Clear the input field after "Enter" is pressed
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chipData]);

  return (
    <div className="w-full h-auto bg-white">
      <section className="pt-10  bg-white">
        <div className="container mx-auto px-[70px]">
          <h1 className="font-bold text-[70px] text-gray-800 mb-4">Jobs</h1>

          {/* Search Section */}
          <div className="flex items-center gap-4">
            <input
              className="flex-grow text-gray-700 px-4 py-2 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Search for your desired job..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
            <Button isIconOnly onPress={onOpen} className="text-white bg-blue-600 hover:bg-blue-700">
              <FaBars />
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Modal */}
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filter by keywords</ModalHeader>
              <ModalBody>
                <Input
                  label=""
                  placeholder="Press Enter to confirm"
                  variant="bordered"
                  ref={inputRef}
                  id="filter"
                />

                {/* Chips arranged horizontally */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {chipData.map((data) => (
                    <Chip
                      key={data.key}
                      variant="flat"
                      onClose={handleDelete(data)}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {data.label}
                    </Chip>
                  ))}
                </div>

                {/* Job Type Filters */}
                <div className="mt-6">
                  <p className="font-semibold">Job Type</p>
                  <div className="flex gap-4 mt-2">
                    <Checkbox
                      size="sm"
                      isSelected={selectedJobTypes.includes("Full-Time")}
                      onChange={() => toggleJobType("Full-Time")}
                    >
                      Full-Time
                    </Checkbox>
                    <Checkbox
                      size="sm"
                      isSelected={selectedJobTypes.includes("Part-Time")}
                      onChange={() => toggleJobType("Part-Time")}
                    >
                      Part-Time
                    </Checkbox>
                    <Checkbox
                      size="sm"
                      isSelected={selectedJobTypes.includes("Internship")}
                      onChange={() => toggleJobType("Internship")}
                    >
                      Internship
                    </Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={applyFilters}>
                  Apply Filters
                </Button>
              </ModalFooter>

              {showAlert && (
                <Alert
                  color="danger"
                  title="You can only add up to 5 filters."
                  className="fixed bottom-4 right-4 z-50 bg-red-600 text-white font-bold shadow-lg"
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Job List Section */}
      <section className="">
        <div className="container mx-auto px-6">
          <Joblist searchQuery={searchQuery} filters={activeFilters} /> {/* Pass filters */}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
 