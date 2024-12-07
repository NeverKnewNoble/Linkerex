"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chip } from "@nextui-org/react";

// React Component
const Jobs = () => {
  const [chipData, setChipData] = useState([]);
  const inputRef = useRef(null);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        const value = inputRef.current?.value;
        if (value && value.trim() !== "") {
          // Limit the array to a maximum of 5 items
          if (chipData.length >= 5) {
            alert("You can only add up to 5 filters.");
            return;
          }

          setChipData((prevData) => [
            ...prevData,
            { key: prevData.length, label: value.trim() },
          ]);
          if (inputRef.current) inputRef.current.value = ""; // Clear the input field
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chipData]); // Add chipData to the dependency array to reflect the latest length

  return (
    <div className="w-full h-[1000px] bg-white">
      {/* Search and Filter Section */}
      <section className="pl-10 pt-10">
        <h1 className="font-bold text-[80px] text-[#2f71c7]">Jobs</h1>

        {/* Search Bar */}
        <input
          className="text-slate-700 pl-2 bg-[#ddecff] rounded-lg w-[1400px] h-10"
          placeholder="Search For Your Desired Job"
        />

        <div className="flex items-center mt-3">
          {/* Filter Array */}
          {/* FilterBar */}
          <input
            ref={inputRef}
            id="filter"
            className="bg-[#ddecff] text-slate-700 pl-2 mr-2 rounded-lg w-[200px] h-[35px]"
            placeholder="Filter"
          />

          {chipData.map((data) => (
            <div key={data.key} className="m-1">
              <Chip
                variant="flat"
                onClose={handleDelete(data)}
                className="bg-[#2f71c7] text-white hover:bg-[#225a9c]"
              >
                {data.label}
              </Chip>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Export the component as the default export
export default Jobs;
