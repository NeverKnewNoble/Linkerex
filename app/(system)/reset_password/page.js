"use client";

import {
  Button,
  Input,
  Link,
  Alert,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";


// Signup Form Component
export default function ResetPasswordPage () {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  
    const token = new URLSearchParams(window.location.search).get("token");
  
    try {
      const response = await axios.post("/api/auth/reset-password", { token, newPassword: password });
  
      if (response.data.success) {
        setAlert({ type: "success", message: "Password reset successful!" });
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      setAlert({ type: "danger", message: err.response?.data?.error || "Reset failed" });
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

          <Button color="primary" type="submit">
           Confirm Password
          </Button>
        </form>
      </div>
    </div>
  );
}