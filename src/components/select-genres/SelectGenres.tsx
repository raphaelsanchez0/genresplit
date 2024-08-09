"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Card } from "../ui/card";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();

  return <Card className="full-page-card"></Card>;
}
