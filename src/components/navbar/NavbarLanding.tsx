import React from "react";
import LoginButton from "../login-button/LoginButton";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout-button/LogoutButton";
import Link from "next/link";

export default function NavbarLanding() {
  return (
    <div className="w-full bg-secondary-color flex items-center py-4 max-w-5xl px-4 md:px-0">
      <h1 className="text-accent-color mr-auto">
        <Link href="/">GenreSplit</Link>
      </h1>
      <LoginButton />
    </div>
  );
}
