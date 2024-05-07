interface FormSuccessProps {
  message?: string;
}

import { FaCircleCheck } from "react-icons/fa6";

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FaCircleCheck className="w-4 h-4 text-emerald-500" />
      <p>{message}</p>
    </div>
  );
}
