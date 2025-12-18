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
import { Search, Filter, X, CheckCircle2, Briefcase, Clock, GraduationCap } from "lucide-react";
import Joblist from "@/components/jobsPage/Joblist";
import { motion } from "framer-motion";

const Jobs = () => {
  const [chipData, setChipData] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({ chips: [], jobTypes: [] });
  const inputRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Delete a filter chip
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  // Toggle job type selection
  const toggleJobType = (type) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Apply filters and close modal
  const applyFilters = () => {
    setActiveFilters({ chips: chipData.map((chip) => chip.label), jobTypes: selectedJobTypes });
    onOpenChange(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setChipData([]);
    setSelectedJobTypes([]);
    setActiveFilters({ chips: [], jobTypes: [] });
  };

  // Handle Enter key to add filter chip
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && inputRef.current) {
        const value = inputRef.current.value;
        if (value && value.trim() !== "") {
          if (chipData.length >= 5) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
          }
          setChipData((prevData) => [
            ...prevData,
            { key: prevData.length, label: value.trim() },
          ]);
          inputRef.current.value = "";
        }
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [chipData]);

  // Count active filters
  const activeFilterCount = activeFilters.chips.length + activeFilters.jobTypes.length;

  // Job type options with icons
  const jobTypeOptions = [
    { value: "Full-Time", label: "Full-Time", icon: Briefcase },
    { value: "Part-Time", label: "Part-Time", icon: Clock },
    { value: "Internship", label: "Internship", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-12 pb-8 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Find Your Dream Job
            </h1>

            {/* Search Bar */}
            <div className="relative flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted"
                  size={20}
                />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Search for your desired job..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onPress={onOpen}
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-4 min-w-[140px]"
                startContent={<Filter size={20} />}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted">Active filters:</span>
                {activeFilters.chips.map((chip, index) => (
                  <Chip
                    key={`chip-${index}`}
                    variant="flat"
                    onClose={() => {
                      const newChips = [...activeFilters.chips];
                      newChips.splice(index, 1);
                      setActiveFilters({ ...activeFilters, chips: newChips });
                    }}
                    className="bg-primary/20 text-primary border border-primary/30"
                  >
                    {chip}
                  </Chip>
                ))}
                {activeFilters.jobTypes.map((type, index) => {
                  const option = jobTypeOptions.find((opt) => opt.value === type);
                  const Icon = option?.icon || Briefcase;
                  return (
                    <Chip
                      key={`type-${index}`}
                      variant="flat"
                      onClose={() => {
                        const newTypes = activeFilters.jobTypes.filter((t) => t !== type);
                        setActiveFilters({ ...activeFilters, jobTypes: newTypes });
                      }}
                      className="bg-primary/20 text-primary border border-primary/30 flex items-center gap-1"
                    >
                      <Icon size={14} />
                      {type}
                    </Chip>
                  );
                })}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-muted hover:text-foreground h-7"
                  startContent={<X size={14} />}
                >
                  Clear all
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Modal */}
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-card border border-border",
          header: "border-b border-border",
          footer: "border-t border-border",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Filter size={24} className="text-primary" />
                  <span className="text-xl font-bold">Filter Jobs</span>
                </div>
                <p className="text-sm text-muted font-normal">
                  Add keywords and select job types to refine your search
                </p>
              </ModalHeader>
              <ModalBody className="py-6">
                {/* Keyword Filters */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Keywords
                  </label>
                  <Input
                    placeholder="Type a keyword and press Enter"
                    variant="bordered"
                    ref={inputRef}
                    id="filter"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-border hover:border-primary/50",
                    }}
                    endContent={
                      <span className="text-xs text-muted">Press Enter</span>
                    }
                  />

                  {/* Filter Chips */}
                  {chipData.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {chipData.map((data) => (
                        <Chip
                          key={data.key}
                          variant="flat"
                          onClose={handleDelete(data)}
                          className="bg-primary/20 text-primary border border-primary/30"
                        >
                          {data.label}
                        </Chip>
                      ))}
                    </div>
                  )}
                  {chipData.length >= 5 && (
                    <p className="text-xs text-warning mt-2">
                      Maximum 5 keywords allowed
                    </p>
                  )}
                </div>

                {/* Job Type Filters */}
                <div className="mt-6 pt-6 border-t border-border">
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Job Type
                  </label>
                  <div className="flex flex-col gap-3">
                    {jobTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <Checkbox
                          key={option.value}
                          size="md"
                          isSelected={selectedJobTypes.includes(option.value)}
                          onValueChange={() => toggleJobType(option.value)}
                          classNames={{
                            base: "w-full max-w-none hover:bg-card/50 rounded-lg p-2",
                            label: "text-foreground",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={18} className="text-primary" />
                            <span className="font-medium">{option.label}</span>
                          </div>
                        </Checkbox>
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setChipData([]);
                    setSelectedJobTypes([]);
                  }}
                  className="text-muted hover:text-foreground"
                >
                  Reset
                </Button>
                <div className="flex gap-2">
                  <Button variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onPress={applyFilters}
                    startContent={<CheckCircle2 size={18} />}
                  >
                    Apply Filters
                  </Button>
                </div>
              </ModalFooter>

              {/* Alert for maximum filters */}
              {showAlert && (
                <Alert
                  color="danger"
                  title="Maximum filters reached"
                  description="You can only add up to 5 keyword filters."
                  className="fixed bottom-4 right-4 z-50 max-w-sm"
                  onClose={() => setShowAlert(false)}
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Job List Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Joblist searchQuery={searchQuery} filters={activeFilters} />
        </div>
      </section>
    </div>
  );
};

export default Jobs;
