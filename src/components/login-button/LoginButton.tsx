import { createAuthURL } from "@/utils/authURLHelper";
import Link from "next/link";
import { Button } from "../ui/button";
export default function LoginButton() {
  return (
    <Button asChild>
      <Link href={createAuthURL()}>Login</Link>
    </Button>
  );
}
