"use client";

import {
  Button,
  Input,
  Checkbox,
  Link,
  Divider,
  Alert,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

// Account Types
export const accountTypes = [
  { key: "student", label: "Student" },
  { key: "company", label: "Company" },
];

// Company Locations
export const companyLocations = [
  { key: "Madina", label: "Madina" },
  { key: "East Legon", label: "East Legon" },
  { key: "Spintex", label: "Spintex" },
  { key: "Airport Residential Area", label: "Airport Residential Area" },
  { key: "Osu", label: "Osu" },
  { key: "Labone", label: "Labone" },
  { key: "Cantonments", label: "Cantonments" },
  { key: "Adenta", label: "Adenta" },
  { key: "Dansoman", label: "Dansoman" },
  { key: "Tema", label: "Tema" },
  { key: "Nungua", label: "Nungua" },
  { key: "Achimota", label: "Achimota" },
  { key: "Sakumono", label: "Sakumono" },
  { key: "Kumasi", label: "Kumasi" },
  { key: "Cape Coast", label: "Cape Coast" },
  { key: "Elmina", label: "Elmina" },
  { key: "Kasoa", label: "Kasoa" },
  { key: "Takoradi", label: "Takoradi" },
  { key: "Winneba", label: "Winneba" },
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
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () =>
    setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      companyName,
      companyLocation,
    };

    console.log("User data being sent:", userData);

    try {
      const response = await axios.post(
        "/api/users",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        setAlert({ type: "success", message: "User created successfully!" });

        // Send welcome email
        await sendWelcomeEmail(email, username);
       

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAccountType("");
        setCompanyName("");
        setCompanyLocation("");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setAlert({ type: "danger", message: `Error creating user: ${errorMessage}` });
    }
  };


  // !Function to send welcome email
  const sendWelcomeEmail = async (to, username) => {
    try {
      await axios.post("/api/send_email", {
        to,
        subject: "Welcome to Linkerex – Your Career Journey Starts Here!",
        text: `Hello ${username},\n\nWelcome to Linkerex – the platform that connects students with jobs and internships!\n\nBy joining Linkerex, you now have access to:\n✅ Exclusive job and internship listings\n✅ Career resources to help you stand out\n\nGet started by completing your profile and exploring opportunities that match your skills.\n\nWe're excited to have you on board!\n\nThe Linkerex Team`,
      });

      console.log("Welcome email sent!");
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  };

  

  return (
    <div className="flex h-full w-full items-center justify-center bg-black p-4 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center">
          <Link href={"/#home"}>
            <Image
              src="/linkerex/whitelincrop.png"
              alt="Linkerex Logo"
              width={744}
              height={70}
              className="cursor-pointer w-[200px] sm:w-[300px]"
            />
          </Link>
        </div>
        {alert.message && (
          <Alert color={alert.type} className="mb-4">
            {alert.message}
          </Alert>
        )}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Full Name"
            name="username"
            placeholder="Enter your Full Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
                <Icon
                  className="pointer-events-none text-2xl"
                  icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
                />
              </button>
            }
          />
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
                <Icon
                  className="pointer-events-none text-2xl"
                  icon={isConfirmVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
                />
              </button>
            }
          />
          <div className="mt-2 w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Account Type
            </label>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="w-full">
                  {accountType || "-- Select Account Type --"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Account Type"
                onAction={(key) => setAccountType(key)}
              >
                {accountTypes.map((type) => (
                  <DropdownItem key={type.key}>{type.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {accountType === "company" && (
              <>
                <Input
                  isRequired
                  label="Company Name"
                  name="companyName"
                  placeholder="Enter your company name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-4"
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Select Company Location
                  </label>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="w-full">
                        {companyLocation || "-- Select Company Location --"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Company Location"
                      onAction={(key) => setCompanyLocation(key)}
                    >
                      {companyLocations.map((location) => (
                        <DropdownItem key={location.key}>
                          {location.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </>
            )}
          </div>

          <Checkbox isRequired className="py-4">
            I agree with the&nbsp;
            <Link href="#">Terms</Link>&nbsp;and&nbsp;
            <Link href="#">Privacy Policy</Link>
          </Checkbox>
          <Button color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <Button
          isDisabled
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="bordered"
        >
          Sign Up with Google
        </Button>
        <p className="text-center text-small">
          Already have an account?&nbsp;
          <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}