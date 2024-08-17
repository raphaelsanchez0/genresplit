"use client";
import AuthGard from "@/components/auth-guard/AuthGard";
import SearchPlaylists from "@/components/search-playlists/SearchPlaylists";
import React, { Suspense } from "react";

export default function Search() {
  return (
    <div className="page">
      <AuthGard>
        <SearchPlaylists />
      </AuthGard>
    </div>
  );
}
