"use client";

import { format } from "date-fns";
import { CalendarIcon, ImageOff, ImagePlus } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";

export default function Profile() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <section className="space-y-6 lg:col-span-10">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <form action="" className="space-y-8 max-w-xl">
        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="border border-gray-500 border-dashed rounded-md p-8 min-h-44 flex flex-col gap-4 items-center justify-center">
            <ImageOff className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No profile image available
            </p>
          </div>
          <CldUploadWidget signatureEndpoint="/api/sign-image">
            {({ open }) => (
              <div
                onClick={() => open()}
                className="flex items-center justify-center gap-6 border border-gray-500 border-dashed rounded p-4 py-2"
              >
                <p className="text-sm text-muted-foreground">
                  Upload a profile image
                </p>{" "}
                <ImagePlus className="text-muted-foreground" />
              </div>
            )}
          </CldUploadWidget>
          <p className="text-[0.8rem] text-muted-foreground">
            Your profile image will be visible to others. Choose an image that
            best represents you.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input placeholder="john doe" name="username" />
          <p className="text-[0.8rem] text-muted-foreground">
            This is your public display name. It can be your real name or an
            alias you choose to represent yourself.
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label>Date of birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(e) => setDate(e)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-[0.8rem] text-muted-foreground">
            Select your date of birth. This information will not be publicly
            visible.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea placeholder="Write about yourself." />
          <p className="text-[0.8rem] text-muted-foreground">
            Share a short bio about yourself. This information will be visible
            to others on your profile.
          </p>
        </div>

        <Button size={"lg"} className={cn("mt-8")}>
          Submit
        </Button>
      </form>
    </section>
  );
}
