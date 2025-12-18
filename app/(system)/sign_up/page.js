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
import { Eye, EyeOff, Mail, Lock, User, Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

// Account Types (for future use)
export const accountTypes = [
  { key: "student", label: "Student" },
  { key: "company", label: "Company" },
];

// Company Locations (for future use)
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert({ type: "", message: "" });

    // Validate passwords match
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match!" });
      setIsLoading(false);
      return;
    }

    // Validate password strength (optional enhancement)
    if (password.length < 6) {
      setAlert({
        type: "danger",
        message: "Password must be at least 6 characters long!",
      });
      setIsLoading(false);
      return;
    }

    const userData = {
      username,
      email,
      password,
      companyName,
      companyLocation,
    };

    try {
      const response = await axios.post("/api/users", userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setAlert({
          type: "success",
          message: "Account created successfully! Redirecting to login...",
        });

        // Send welcome email
        await sendWelcomeEmail(email, username);

        // Clear form
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCompanyName("");
        setCompanyLocation("");

        // Redirect after delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setAlert({
        type: "danger",
        message: `Error creating account: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send welcome email
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-card/20 to-background p-4 sm:p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex w-full max-w-md flex-col gap-6"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Link href="/#home" className="mb-2">
            <Image
              src="/linkerex/whitelincrop.png"
              alt="Linkerex Logo"
              width={744}
              height={70}
              className="cursor-pointer w-[200px] sm:w-[280px] hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-4">
            Create Your Account
          </h1>
          <p className="text-muted text-sm mt-1">
            Join Linkerex and start your career journey
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* Alert Message */}
          {alert.message && (
            <Alert
              color={alert.type}
              variant="flat"
              title={alert.message}
              className="mb-4"
              classNames={{
                base:
                  alert.type === "success"
                    ? "border border-success/50 bg-success/10"
                    : "border border-error/50 bg-error/10",
                title:
                  alert.type === "success" ? "text-success" : "text-error",
              }}
            />
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <Input
              isRequired
              label="Full Name"
              name="username"
              placeholder="Enter your full name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              startContent={<User size={18} className="text-muted" />}
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-border hover:border-primary/50 focus-within:border-primary",
                label: "text-foreground",
              }}
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
              startContent={<Mail size={18} className="text-muted" />}
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-border hover:border-primary/50 focus-within:border-primary",
                label: "text-foreground",
              }}
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
              startContent={<Lock size={18} className="text-muted" />}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                  className="focus:outline-none text-muted hover:text-foreground transition-colors"
                >
                  {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-border hover:border-primary/50 focus-within:border-primary",
                label: "text-foreground",
              }}
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
              startContent={<Lock size={18} className="text-muted" />}
              endContent={
                <button
                  type="button"
                  onClick={toggleConfirmVisibility}
                  aria-label="Toggle password visibility"
                  className="focus:outline-none text-muted hover:text-foreground transition-colors"
                >
                  {isConfirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-border hover:border-primary/50 focus-within:border-primary",
                label: "text-foreground",
              }}
            />

            {/* Terms and Conditions */}
            <Checkbox
              isRequired
              classNames={{
                label: "text-foreground text-sm",
              }}
            >
              I agree with the{" "}
              <Link href="#" className="text-primary hover:text-primary-hover">
                Terms and Conditions
              </Link>
            </Checkbox>

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="font-semibold h-12 mt-2"
              startContent={!isLoading && <UserPlus size={18} />}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4 mt-2">
            <Divider className="flex-1 bg-border" />
            <p className="shrink-0 text-xs text-muted uppercase">OR</p>
            <Divider className="flex-1 bg-border" />
          </div>

          {/* Social Signup (Disabled) */}
          <Button
            isDisabled
            variant="bordered"
            className="border-border hover:border-primary/50"
            startContent={
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            }
          >
            Sign Up with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-hover font-semibold transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
