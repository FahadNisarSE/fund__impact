"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import resetPassword from "@/actions/reset-password";
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
import {
  ResetPasswordSchema,
  TresetPasswordSchema,
} from "@/schema/auth.schema";
import FormSuccess from "../form-success";

export default function ResetForm() {
  const [isPending, startTranistion] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<TresetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: TresetPasswordSchema) => {
    setError(undefined);
    setSuccess(undefined);

    startTranistion(async () => {
      const data = await resetPassword(values);
      setError(data?.error);
      setSuccess(data?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
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
