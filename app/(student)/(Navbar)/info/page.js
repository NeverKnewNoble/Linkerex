"use client";

import React from "react";
import Image from "next/image";
import { Form, Input, Button } from "@nextui-org/react";
import Link from "next/link";

const Info = () => {
  const [action, setAction] = React.useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
      }}
    >
      {/* Container */}
      <div className="bg-white/90 w-full max-w-[1200px] flex flex-col items-center justify-center rounded-lg shadow-2xl p-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-black text-4xl font-bold">My Information</h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8">
          {/* User Avatar Section */}
          <div className="bg-black flex-shrink-0 w-full lg:w-[350px] flex flex-col items-center justify-center rounded-lg shadow-lg p-6">
            <Image
              src="/linkerex/lady.jpg"
              alt="User Avatar"
              width={200}
              height={200}
              className="w-[200px] h-[200px] rounded-full mb-4 border-4 border-white shadow-md object-cover overflow-hidden"
            />
            <p className="text-white font-bold text-xl">Larry-Noble</p>
            <p className="text-gray-100 font-medium text-lg">Student</p>
          </div>

          {/* Information Section */}
          <div className="bg-black w-full lg:w-[750px] flex flex-col items-center justify-center rounded-lg shadow-lg p-8">
            <Form
              className="w-full flex flex-col gap-6"
              validationBehavior="native"
              onReset={() => setAction("reset")}
              onSubmit={(e) => {
                e.preventDefault();
                let data = Object.fromEntries(new FormData(e.currentTarget));

                setAction(`submit ${JSON.stringify(data)}`);
              }}
            >
              <Input
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
                className="text-white"
              />

              <Input
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your Email"
                type="email"
                className="text-white"
              />

              <Input
                isDisabled
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
                className="text-white"
              />

              <Input
                isDisabled
                label="Account Type"
                labelPlacement="outside"
                name="account_type"
                placeholder="Choose Account Type"
                type="text"
                className="text-white"
              />

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Link href={"/forgot_pswd"}>
                  <Button color="primary" auto>
                    Save
                  </Button>
                </Link>

                <Link href={"/forgot_pswd"}>
                  <Button color="primary" auto>
                    Reset Password
                  </Button>
                </Link>

                <Button
                  type="reset"
                  variant="flat"
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
