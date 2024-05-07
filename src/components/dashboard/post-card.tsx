import { Eye } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PostCard() {
  return (
    <Card className="w-full max-w-[350px~]">
      <CardHeader>
        <CardTitle>Personal Assistant</CardTitle>
        <CardDescription>Just one click away from you.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Image
            className="rounded-lg"
            src={
              "https://img.freepik.com/free-vector/digital-device-mockup_53876-89362.jpg?w=740&t=st=1715044712~exp=1715045312~hmac=efeae79312dafb6bd9b5f53400a83383d4a3fefdc0b45b5192f2acbafc352709"
            }
            alt="product image"
            width={400}
            height={250}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" className="font-bold">
          <Eye className="w-4 h-4 mr-2" /> 101 k
        </Button>
        <Button>Go to Post</Button>
      </CardFooter>
    </Card>
  );
}
