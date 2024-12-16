"use client";

import {
  Button,
  Input,
  Checkbox,
  Link,
  Divider,
  Alert, // Import Alert component
} from "@nextui-org/react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use Next.js router
import axios from "axios";

// Account Types
export const accountTypes = [
  { key: "student", label: "Student" },
  { key: "company", label: "Company" },
];

// Signup Form Component
export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" }); // State for alert
  const router = useRouter(); // Initialize Next.js router

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match!" });
      return;
    }

    if (!accountType) {
      setAlert({ type: "danger", message: "Please select an account type!" });
      return;
    }

    const userData = {
      username,
      email,
      password,
      account_type: accountType,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        setAlert({ type: "success", message: "User created successfully!" });
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAccountType("");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setAlert({
          type: "danger",
          message: `Error creating user: ${err.response.data.error}`,
        });
      } else {
        setAlert({
          type: "danger",
          message: `Error creating user: ${err.message}`,
        });
      }
    }
  };



  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center">
          <Link href={"/#home"}>
            <Image
              src="/linkerex/whitelincrop.png"
              alt="Linkerex Logo"
              width={744}
              height={70}
              className="cursor-pointer"
            />
          </Link>
        </div>
        {/* Alert Component */}
        {alert.message && (
          <Alert color={alert.type} className="mb-4">
            {alert.message}
          </Alert>
        )}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Username Input */}
          <Input
            isRequired
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Email Input */}
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input */}
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
          />
          {/* Confirm Password Input */}
          <Input
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
          />
          {/* Custom Select for Account Type */}
          <div className="mt-2 w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Account Type
            </label>
            <select
              className="block w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md px-3 py-2 focus:ring focus:ring-indigo-500 focus:outline-none"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select Account Type --
              </option>
              {accountTypes.map((type) => (
                <option key={type.key} value={type.key}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {/* Agreement Checkbox */}
          <Checkbox isRequired className="py-4">
            I agree with the&nbsp;
            <Link href="#">Terms</Link>&nbsp;and&nbsp;
            <Link href="#">Privacy Policy</Link>
          </Checkbox>
          {/* Submit Button */}
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Sign Up with Google
          </Button>
        </div>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
