import Link from "next/link";
import LogoutButton from "../logout-button/LogoutButton";

export default function NavbarUI() {
  return (
    <div className="w-full bg-secondary-color p-4 justify-center">
      <div className="flex md:w-3/4 items-center mx-auto justify-between w-full">
        <h1 className="text-accent-color mr-auto">
          <Link href="/">GenreSplit</Link>
        </h1>
        <LogoutButton />
      </div>
    </div>
  );
}
