"use client";

import React from "react";
import Image from "next/image";
import { Form, Input, Button, Alert } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import Loading from "../../../loading";
import Login_now from "../../../NotLoggedIn";

const CompanyDetails = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
  });
  const [alert, setAlert] = React.useState(null); // Define alert state
  const [showModal, setShowModal] = React.useState(false); // Modal visibility state

  React.useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  //? Handle loading and unauthenticated states
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <Login_now />;
  }

  //? Function to Update User Information
  const updateUserInfo = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlert({
          type: "success",
          message: "User information updated successfully! .......Please Note, Any Changes Will Apply After An Hour!",
        });
      } else {
        const errorData = await res.json();
        setAlert({
          type: "danger",
          message: `Failed to update user information: ${errorData.error}`,
        });
      }
    } catch (err) {
      console.error("Error updating user information:", err);
      setAlert({ type: "danger", message: `Error: ${err.message}` });
    }
  };

  //? Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //? Function to Delete Account
  const deleteById = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${session.user.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("User Deleted");
        setAlert({ type: "success", message: "Account deleted successfully!" });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setAlert({ type: "danger", message: `Error: ${err.message}` });
    }
  };

  //? Modal Component
  const Modal = ({ onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                onConfirm();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')",
      }}
    >
      <div className="max-w-[1900px] w-[1200px] mb-3">
        {alert && (
          <Alert color={alert.type === "success" ? "success" : "error"}>
            {alert.message}
          </Alert>
        )}
      </div>

      <div className="bg-white/90 w-full max-w-[1200px] flex flex-col items-center justify-center rounded-lg shadow-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-black text-4xl font-bold">My Information</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8">
          <div className="bg-black flex-shrink-0 w-full lg:w-[350px] flex flex-col items-center justify-center rounded-lg shadow-lg p-6">
            <div>
              {session.user.account_type === "student" ? (
                <Image
                  src="/linkerex/user1.png"
                  alt="User Avatar"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] rounded-full mb-4 shadow-md object-cover overflow-hidden"
                />
              ) : (
                <Image
                  src="/linkerex/user1.png"
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="w-[200px] h-[200px] rounded-full mb-4 shadow-md object-fill overflow-hidden"
                />
              )}
            </div>
            <p className="text-white font-bold text-xl">{formData.username || ""}</p>
            <p className="text-gray-100 font-medium text-lg">{session.user.account_type || ""}</p>
          </div>
          <div className="bg-black w-full lg:w-[750px] flex flex-col items-center justify-center rounded-lg shadow-lg p-8">
            <Form
              className="w-full flex flex-col gap-6"
              validationBehavior="native"
              onReset={() => setFormData({ username: "", email: "" })}
              onSubmit={(e) => {
                e.preventDefault();
                updateUserInfo();
              }}
            >
              <Input
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
                className="text-white"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your Email"
                type="email"
                className="text-white"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                readOnly
                label="Account Type"
                labelPlacement="outside"
                name="account_type"
                placeholder="Choose Account Type"
                type="text"
                className="text-white"
                value={session.user.account_type || ""}
              />
                <Input
                label="Company Name"
                labelPlacement="outside"
                name="company_name"
                placeholder=""
                type="text"
                className="text-white"
                value={session.user.company_name || ""}
                onChange={handleChange}
              />
                <Input
                label="Company Location"
                labelPlacement="outside"
                name="comapany_location"
                placeholder=""
                type="text"
                className="text-white"
                value={session.user.company_location || ""}
                onChange={handleChange}
              />
              <div className="flex gap-4 justify-center">
                <Button onClick={() => updateUserInfo()} color="primary" auto type="submit">
                  Save
                </Button>
                <Button
                  type="reset"
                  variant="flat"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setShowModal(true)}
                >
                  Delete Account
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} onConfirm={deleteById} />}
    </div>
  );
};

export default CompanyDetails;
