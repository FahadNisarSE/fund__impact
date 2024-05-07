"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { register } from "@/actions/register";
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
  TUserSignUpSchema,
  UserRole,
  userSignUpSchema,
} from "@/schema/auth.schema";
import FormSuccess from "../form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RegisterForm() {
  const [isPending, startTranistion] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<TUserSignUpSchema>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      userRole: UserRole.Creator,
    },
  });

  const onSubmit = (values: TUserSignUpSchema) => {
    setError(undefined);
    setSuccess(undefined);

    startTranistion(async () => {
      const data = await register(values);
      setError(data?.error);
      setSuccess(data?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create a Account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/signin"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    placeholder="john"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Creator">Creator</SelectItem>
                    <SelectItem value="Supporter">Supporter</SelectItem>
                    <SelectItem value="Investor">Investor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error ?? ""} />
          <FormSuccess message={success ?? ""} />
          <Button disabled={isPending} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
