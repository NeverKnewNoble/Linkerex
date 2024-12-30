import Link from "next/link";
import { Form, Input, Button } from "@nextui-org/react";

export default function Login_now() {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
        <p>You are not logged in. Please log in to view your information.</p>
        <Link href="/login" className="mt-2">
            <Button>Login</Button>
        </Link>
      </div>
    );
  }