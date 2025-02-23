// "use client";

// import React, { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import { Button, Input, Checkbox, Link, Divider, Alert } from "@nextui-org/react";
// import { Icon } from "@iconify/react";
// import Image from "next/image";
// import { useSession } from "next-auth/react";

// export default function Component() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [alert, setAlert] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const { data: session, status } = useSession();

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAlert(null); // Clear previous alerts
//     setIsLoading(true); // Set loading state

//     const { email, password } = formData;

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });

//       if (result?.error) {
//         setAlert({
//           type: "error",
//           message: "Failed to log in. Please check your credentials.",
//         });
//         setIsLoading(false); // Stop loading state
//       }
//     } catch (error) {
//       setAlert({
//         type: "error",
//         message: `An error occurred: ${error.message}`,
//       });
//       setIsLoading(false); // Stop loading state
//     }
//   };

//   // Handle redirection when the session status updates to "authenticated"
//   useEffect(() => {
//     if (status === "authenticated") {
//       const { account_type } = session.user;
//       setIsLoading(false); // Stop loading state

//       if (account_type === "student") {
//         window.location.href = "/";
//       } else if (account_type === "company") {
//         window.location.href = "/desk/dashboard";
//       } else {
//         console.error("Account doesn't have an account type");
//       }
//     }
//   }, [status, session]);

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-black">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center mt-5">
//           <Link href={"/#home"}>
//             <Image
//               src="/linkerex/whitelincrop.png"
//               alt="Linkerex Logo"
//               width={744}
//               height={80}
//               className="cursor-pointer"
//             />
//           </Link>
//         </div>
//         <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//           <div className="flex flex-col">
//             <Input
//               label="Email Address"
//               name="email"
//               placeholder="Enter your email"
//               type="email"
//               variant="bordered"
//               value={formData.email}
//               onChange={handleChange}
//               className="mb-2"
//               required
//             />
//             <Input
//               endContent={
//                 <button
//                   type="button"
//                   onClick={toggleVisibility}
//                   aria-label="Toggle password visibility"
//                 >
//                   <Icon
//                     className="pointer-events-none text-2xl text-default-400"
//                     icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
//                   />
//                 </button>
//               }
//               label="Password"
//               name="password"
//               placeholder="Enter your password"
//               type={isVisible ? "text" : "password"}
//               variant="bordered"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between px-1 py-2">
//             <Checkbox name="remember" size="sm">
//               Remember me
//             </Checkbox>
//             <Link className="text-blue-500 hover:underline" href="/forgot_pswd" size="sm">
//               Forgot password?
//             </Link>
//           </div>
//           {alert && (
//             <Alert className="mt-2 text-red-600">
//               {alert.message}
//             </Alert>
//           )}
//           <Button color="primary" type="submit" isLoading={isLoading}>
//             {isLoading ? "Logging in..." : "Log In"}
//           </Button>
//         </form>
//         <div className="flex items-center gap-4 py-2">
//           <Divider className="flex-1" />
//           <p className="shrink-0 text-tiny text-default-500">OR</p>
//           <Divider className="flex-1" />
//         </div>
//         <div className="flex flex-col gap-2">
//           <Button
//             isDisabled
//             startContent={<Icon icon="flat-color-icons:google" width={24} />}
//             variant="bordered"
//           >
//             Continue with Google
//           </Button>
//         </div>
//         <p className="text-center text-small">
//           Need to create an account?&nbsp;
//           <Link href={"/sign_up"} size="sm">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Button, Input, Checkbox, Link, Divider, Alert } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Component() {
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
    setAlert(null); // Clear previous alerts
    setIsLoading(true); // Set loading state

    const { email, password } = formData;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setAlert({
          type: "error",
          message: "Failed to log in. Please check your credentials.",
        });
        setIsLoading(false); // Stop loading state
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `An error occurred: ${error.message}`,
      });
      setIsLoading(false); // Stop loading state
    }
  };

  // Handle redirection when the session status updates to "authenticated"
  useEffect(() => {
    if (status === "authenticated") {
      const { account_type } = session.user;
      setIsLoading(false); // Stop loading state

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
    <div className="flex h-full w-full items-center justify-center bg-black p-4 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center mt-5">
          <Link href={"/#home"}>
            <Image
              src="/linkerex/whitelincrop.png"
              alt="Linkerex Logo"
              width={744}
              height={80}
              className="cursor-pointer w-[200px] sm:w-[300px]"
            />
          </Link>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
              className="mb-2"
              required
            />
            <Input
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                >
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
                  />
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-blue-500 hover:underline" href="/forgot_pswd" size="sm">
              Forgot password?
            </Link>
          </div>
          {alert && (
            <Alert className="mt-2 text-red-600">
              {alert.message}
            </Alert>
          )}
          <Button color="primary" type="submit" isLoading={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            isDisabled
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href={"/sign_up"} size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}