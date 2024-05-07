"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CardWrapper from "@/components/CardWrapper";
import { TloginUserSchema, loginUserSchema } from "@/schema/auth.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";

export default function LoginForm() {
  const [isPending, startTranistion] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in user with different provider"
      : "";

  const form = useForm<TloginUserSchema>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TloginUserSchema) => {
    setError(undefined);
    setSuccess(undefined);

    startTranistion(async () => {
      const data = await login(values);
      setError(data?.error);
      setSuccess(data?.success);
      if (data?.login) window.location.href = "/";
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/signup"
      showSocial
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
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <Link href="/auth/reset">Forgot password?</Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error || urlError || ""} />
          <FormSuccess message={success ?? ""} />
          <Button disabled={isPending} type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
