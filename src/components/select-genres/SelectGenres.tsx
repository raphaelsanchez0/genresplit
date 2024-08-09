"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Card } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

  return <Card className="full-page-card"></Card>;
}
