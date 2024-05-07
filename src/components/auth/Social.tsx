"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "../../../route";

export default function Social() {
  function onClick() {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        size={"lg"}
        variant="outline"
        onClick={onClick}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}
