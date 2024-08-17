import PlaylistInfo from "@/components/playlist/playlist-info/PlaylistInfo";
import { getSpotifyToken } from "@/utils/authHelpers";
import React from "react";

interface PlaylistProps {
  params: {
    id: string;
  };
}

export default function Playlist({ params: { id } }: PlaylistProps) {
  return (
    <div className="page">
      <PlaylistInfo id={id} />
    </div>
  );
}
