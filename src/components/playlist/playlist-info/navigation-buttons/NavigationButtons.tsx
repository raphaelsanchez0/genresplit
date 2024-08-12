"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavigationButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 pb-2 justify-end">
      <Button variant="outline" onClick={() => router.back()}>
        Create more Playlists
      </Button>
      <Button onClick={() => router.push("/search")}>Start over</Button>
    </div>
  );
}
