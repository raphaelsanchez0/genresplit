import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { createAuthURL } from "@/utils/authURLHelper";
import { cookieNames } from "@/utils/constants";
export default function LoginButton() {
  return (
    <Button asChild>
      <Link href={createAuthURL()}>Login</Link>
    </Button>
  );
}
