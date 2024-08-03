import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { createAuthURL } from "@/utils/authURLHelper";

export default function LoginButton() {
  return (
    <Button asChild>
      <Link href={createAuthURL()}>Login</Link>
    </Button>
  );
}
