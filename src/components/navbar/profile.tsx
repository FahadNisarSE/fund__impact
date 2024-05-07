"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import LogOut from "@/actions/logout";

export default function Profile() {
  const { data } = useSession();

  return data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <FiUser className="overflow-hidden rounded-full w-6 h-6 text-primmary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-muted" />
        <DropdownMenuItem>
          <Link
            href="/settings"
            className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="#"
            className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-muted" />
        <DropdownMenuItem>
          <span
            onClick={() => signOut()}
            className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Link className={buttonVariants()} href="/auth/signin">
        Sign In
      </Link>
    </>
  );
}
