"use client";

import CardWrapper from "../CardWrapper";
import { CgSpinner } from "react-icons/cg";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function NewVeririfcationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (token)
      newVerification(token)
        .then((data) => {
          setSuccess(data?.success);
          setError(data?.error);
        })
        .catch((error) => setError("Something went wrong!"));
    else setError("Missing Token");
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming you verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-stretch w-full justify-center">
        {!success && !error && (
          <CgSpinner className="w-10 h-10 mx-auto animate-spin duration-700 my-4" />
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
