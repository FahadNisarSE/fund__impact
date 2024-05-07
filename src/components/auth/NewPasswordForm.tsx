"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { newPassword } from "@/actions/new-password";
import CardWrapper from "@/components/CardWrapper";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema, TNewPasswordSchema } from "@/schema/auth.schema";
import { useSearchParams } from "next/navigation";
import FormSuccess from "../form-success";

export default function NewPasswordForm() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const [isPending, startTranistion] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<TNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: TNewPasswordSchema) => {
    setError(undefined);
    setSuccess(undefined);

    startTranistion(async () => {
      const data = await newPassword(values, token);
      setError(data?.error);
      setSuccess(data?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="*********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error || ""} />
          <FormSuccess message={success ?? ""} />
          <Button disabled={isPending} type="submit" className="w-full">
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
