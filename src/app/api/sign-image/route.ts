import { v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    ParamsToSign: Record<string, string>;
  };
  const { ParamsToSign } = body;

  if (!process.env.CLOUDINARY_API_SECRET)
    throw new Error("CLOUDINARY_API_SECRET not found.");

  const signature = cloudinary.utils.api_sign_request(
    ParamsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return Response.json({ signature });
}
