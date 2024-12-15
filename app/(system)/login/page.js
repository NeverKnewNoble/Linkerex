"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center  mt-5">
            <Link href={"/#home"}>
            <Image
                src="/linkerex/whitelincrop.png"
                alt="Linkerex Logo"
                width={744}
                height={80}
                className="cursor-pointer"
            />
            </Link>
        </div>
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <Input
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
            />
            <Input
              classNames={{
                inputWrapper: "rounded-t-none",
              }}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
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
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
            variant="bordered"
          >
            Continue with Github
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
