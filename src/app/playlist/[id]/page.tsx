"use client";
import AuthGard from "@/components/auth-guard/AuthGard";
import PlaylistInfo from "@/components/playlist/playlist-info/PlaylistInfo";
import React from "react";

interface PlaylistProps {
  params: {
    id: string;
  };
}

export default function Playlist({ params: { id } }: PlaylistProps) {
  return (
    <AuthGard>
      <div className="page">
        <PlaylistInfo id={id} />
      </div>
    </AuthGard>
  );
}
