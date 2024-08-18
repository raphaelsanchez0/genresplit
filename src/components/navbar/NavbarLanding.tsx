import React from "react";
import LoginButton from "../login-button/LoginButton";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout-button/LogoutButton";

export default function NavbarLanding() {
  return (
    <div className="w-full bg-secondary-color flex items-center py-4 max-w-5xl">
      <h1 className="text-accent-color mr-auto">GenreSplit</h1>
      <LoginButton />
    </div>
  );
}
