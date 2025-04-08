"use client";

import Sidebar from "@/components/desk/general/SideBar";
import Login_now from "../../NotLoggedIn";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading/>; // Prevents flickering and errors
  if (!session || !session.user || session.user.account_type === "student") return <Login_now />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
