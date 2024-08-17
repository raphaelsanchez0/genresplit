"use client";
import SelectGenres from "@/components/select-genres/SelectGenres";
import { Suspense } from "react";
import LoadingCard from "@/components/loading-card/LoadingCard";
import AuthGard from "@/components/auth-guard/AuthGard";

export default function SelectGenresPage() {
  return (
    <div className="page">
      <AuthGard>
        <SelectGenres />
      </AuthGard>
    </div>
  );
}
