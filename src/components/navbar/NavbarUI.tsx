import LoginButton from "../login-button/LoginButton";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout-button/LogoutButton";

export default function NavbarUI() {
  return (
    <div className="w-full flex bg-secondary-color items-center p-4">
      <h1 className="text-accent-color mr-auto">GenreSplit</h1>
      <LogoutButton />
    </div>
  );
}
