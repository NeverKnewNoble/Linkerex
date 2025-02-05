"use client";

import React from "react";
import { Button, Textarea, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Payment = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      <div className="w-full bg-white min-h-screen mx-80 my-10 text-[#18181b] rounded-lg shadow-lg p-8">
        <h2 className="text-[40px] font-bold mb-4">Payment Page</h2>
      </div>
    </div>
  );
};

export default Payment;
