import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "auth";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/navbar/header";
import Providers from "@/lib/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fund Impact",
  description: "Online patreon and project funding solution.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider session={session}>
            <Header />
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
