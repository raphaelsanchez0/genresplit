"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import { cookieNames } from "@/utils/constants";

export default function LogoutButton() {
  return (
    <Button asChild>
      <Link href="/logout">Logout</Link>
    </Button>
  );
}
