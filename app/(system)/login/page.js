"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button, Input, Checkbox, Link, Divider, Alert } from "@nextui-org/react";
import { Eye, EyeOff, Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setIsLoading(true);

    const { email, password } = formData;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setAlert({
          type: "danger",
          message: "Failed to log in. Please check your credentials.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      setAlert({
        type: "danger",
        message: `An error occurred: ${error.message}`,
      });
      setIsLoading(false);
    }
  };

  // Handle redirection when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const { account_type } = session.user;
      setIsLoading(false);

      if (account_type === "student") {
        window.location.href = "/";
      } else if (account_type === "company") {
        window.location.href = "/desk/dashboard";
      } else {
        console.error("Account doesn't have an account type");
      }
    }
  }, [status, session]);

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
              height={80}
              className="cursor-pointer w-[200px] sm:w-[280px] hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-4">
            Welcome Back
          </h1>
          <p className="text-muted text-sm mt-1">
            Sign in to continue to Linkerex
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email Input */}
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
              required
              startContent={<Mail size={18} className="text-muted" />}
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-border hover:border-primary/50 focus-within:border-primary",
                label: "text-foreground",
              }}
            />

            {/* Password Input */}
            <Input
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
              required
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                name="remember"
                size="sm"
                classNames={{
                  label: "text-foreground text-sm",
                }}
              >
                Remember me
              </Checkbox>
              <Link
                href="/forgot_pswd"
                className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Alert Message */}
            {alert && (
              <Alert
                color={alert.type}
                variant="flat"
                title={alert.message}
                classNames={{
                  base: "border border-error/50 bg-error/10",
                  title: "text-error",
                }}
              />
            )}

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              className="font-semibold h-12"
              startContent={!isLoading && <LogIn size={18} />}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4">
            <Divider className="flex-1 bg-border" />
            <p className="shrink-0 text-xs text-muted uppercase">OR</p>
            <Divider className="flex-1 bg-border" />
          </div>

          {/* Social Login (Disabled for now) */}
          <div className="flex flex-col gap-2">
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
              Continue with Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted mt-6">
            Need to create an account?{" "}
            <Link
              href="/sign_up"
              className="text-primary hover:text-primary-hover font-semibold transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
