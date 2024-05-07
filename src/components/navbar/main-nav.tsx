import Link from "next/link";
import { FaChartBar } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { auth } from "auth";

type item = { href: string; title: string; disabled: boolean }[];

export default async function MainNav() {
  const session = await auth();
  let items: item = [];

  if (session) {
    if (session?.user.role === "Creator") {
      items.push({ title: "Home", href: "/", disabled: false });
      items.push({ title: "Dashboard", href: "/dashboard", disabled: false });
    } else {
      items.push({ title: "Home", href: "/", disabled: false });
      items.push({ title: "Settings", href: "/settings", disabled: false });
    }
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <FaChartBar className="h-6 w-6" />
        <span className="inline-block font-bold text-primary">Fund Impact</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
