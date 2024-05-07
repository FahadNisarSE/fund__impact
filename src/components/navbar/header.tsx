import Link from "next/link";

import MainNav from "./main-nav";
import Profile from "./profile";
import { buttonVariants } from "../ui/button";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href="/" target="_blank">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <span className="sr-only">Fund Impact</span>
              </div>
            </Link>
            {/* <Link
              href={'siteConfig.links.twitter'}
              target="_blank"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Profile />
          </nav>
        </div>
      </div>
    </header>
  );
}
