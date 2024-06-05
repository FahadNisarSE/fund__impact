import Link from "next/link";

export default function SettingsDashboardNav() {
  return (
    <nav className="lg:flex-col lg:items-start flex items-center gap-4 text-sm text-muted-foreground col-span-2 rounded">
      <Link
        href="#"
        className="font-semibold text-primary hover:font-semibold hover:text-primary transition"
      >
        Profile
      </Link>
      <Link
        href="#"
        className="hover:font-semibold hover:text-primary transition"
      >
        Account information
      </Link>
      <Link
        href="#"
        className="hover:font-semibold hover:text-primary transition"
      >
        Other Information
      </Link>
      <Link
        href="#"
        className="hover:font-semibold hover:text-primary transition"
      >
        Go back
      </Link>
    </nav>
  );
}
