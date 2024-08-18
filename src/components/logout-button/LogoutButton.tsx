"use client";
import { localStorageKeys } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(localStorageKeys.SPOTIFY_TOKEN);
    router.push("/");
  };
  return <Button onClick={() => handleLogout()}>Logout</Button>;
}
