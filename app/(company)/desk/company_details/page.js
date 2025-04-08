"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Form, Input, Button, Alert } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Loading from "@/app/loading";
import Login_now from "../../../NotLoggedIn";

const CompanyDetails = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    company_name: "",
    company_location: "",
  });
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",
        company_name: session.user.company_name || "",
        company_location: session.user.company_location || "",
      });
    }
  }, [session]);

  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <Login_now />;

  const updateUserInfo = async () => {
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setAlert({
        type: res.ok ? "success" : "error",
        message: res.ok
          ? "Your profile has been updated successfully! Changes will take effect within an hour. If you don’t see the changes, try logging in again."
          : `Update failed: ${result.error || "Unknown error"}`,
      });
    } catch (err) {
      setAlert({ type: "error", message: `Error: ${err.message}` });
    }
  };

  const deleteById = async () => {
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAlert({ type: "success", message: "Account deleted successfully!" });
        signOut({ callbackUrl: "/" });
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      setAlert({ type: "error", message: `Error: ${err.message}` });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#18181b]"
    >
      {/* Alert Popup */}
      {alert && (
        <div className="fixed top-20 right-4 z-50">
          <Alert
            color={alert.type === "success" ? "success" : "error"}
            variant="flat"
            onClose={() => setAlert(null)}
            className="shadow-lg"
          >
            {alert.message}
          </Alert>
        </div>
      )}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-[1200px] bg-white/90 dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8"
      >
        <h1 className="text-center text-2xl md:text-4xl font-bold text-black dark:text-white">Company Details</h1>

        <div className="flex flex-col items-center justify-between w-full gap-6 mt-6">
          {/* Profile Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 text-white w-full md:w-2/3 lg:w-1/3 rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <Image
              src="/linkerex/user1.png"
              alt="User Avatar"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
            <p className="text-lg md:text-xl font-bold mt-4">{formData.username}</p>
            <p className="text-gray-400 text-sm md:text-base">{session.user.account_type || "User"}</p>
          </motion.div>

          {/* Information Form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-full bg-gray-900 text-white rounded-lg shadow-lg p-4 md:p-6"
          >
            <Form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                updateUserInfo();
              }}
            >
              <Input
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="text-white"
              />
              <Input
                label="Email"
                name="email"
                placeholder="Enter your Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-white"
              />
              <Input
                readOnly
                label="Account Type"
                name="account_type"
                value={session.user.account_type || ""}
                className="text-white"
              />
              <Input
                label="Company Name"
                name="company_name"
                placeholder="Enter company name"
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="text-white"
              />
              <Input
                label="Company Location"
                name="company_location"
                placeholder="Enter company location"
                type="text"
                value={formData.company_location}
                onChange={(e) => setFormData({ ...formData, company_location: e.target.value })}
                className="text-white"
              />

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button color="primary" auto type="submit" className="w-full md:w-auto">
                  Save Changes
                </Button>
                <Button
                  variant="flat"
                  className="bg-red-600 text-white hover:bg-red-700 w-full md:w-auto"
                  onClick={() => setShowModal(true)}
                >
                  Delete Account
                </Button>
              </div>
            </Form>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for Account Deletion */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md text-black dark:text-white mx-4"
          >
            <h2 className="text-lg md:text-xl font-bold">Confirm Deletion</h2>
            <p className="mt-2 text-sm md:text-base">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
              <Button onClick={() => setShowModal(false)} className="bg-gray-300 dark:bg-gray-700 w-full md:w-auto">
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 w-full md:w-auto"
                onClick={() => {
                  deleteById();
                  setShowModal(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CompanyDetails;