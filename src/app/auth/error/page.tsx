import CardWrapper from "@/components/CardWrapper";
import { IoIosWarning } from "react-icons/io";

export default function AuthErrorPage() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/signin"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <IoIosWarning className="w-4 h-4 text-red-500" />
      </div>
    </CardWrapper>
  );
}
