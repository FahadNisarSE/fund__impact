interface FormErrorProps {
  message?: string;
}

import { IoIosWarning } from "react-icons/io";

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <IoIosWarning className="w-4 h-4 text-red-500" />
      <p>{message}</p>
    </div>
  );
}
