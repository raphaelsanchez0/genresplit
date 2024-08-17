"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { localStorageKeys, spotify } from "@/utils/constants";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(localStorageKeys.SPOTIFY_TOKEN);
    router.push("/");
  };
  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
