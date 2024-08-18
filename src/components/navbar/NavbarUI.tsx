import LoginButton from "../login-button/LoginButton";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout-button/LogoutButton";
import Link from "next/link";

export default function NavbarUI() {
  return (
    <div className="w-full bg-secondary-color p-4 justify-center">
      <div className="flex w-3/4 items-center mx-auto justify-between">
        <h1 className="text-accent-color mr-auto">
          <Link href="/">GenreSplit</Link>
        </h1>
        <LogoutButton />
      </div>
    </div>
  );
}
