import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Login_now() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center px-4 text-center z-50">
      <p className="text-white text-lg sm:text-xl max-w-sm">
        You are not logged in or lack the needed roles and permissions. Please log in to view your information.
      </p>
      <div className="flex gap-2">
      <Link href="/login" className="mt-4">
        <Button className="w-full sm:w-auto px-6 py-3 text-lg">Login</Button>
      </Link>
      <Link href="/" className="mt-4">
        <Button className="w-full sm:w-auto px-6 py-3 text-lg">Home</Button>
      </Link>
      </div>

    </div>
  );
}
