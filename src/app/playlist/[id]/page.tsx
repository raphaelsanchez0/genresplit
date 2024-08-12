import PlaylistInfo from "@/components/playlist/playlist-info/PlaylistInfo";
import { getSpotifyToken } from "@/utils/authHelpers";
import React from "react";

interface PlaylistProps {
  params: {
    id: string;
  };
}

export default function Playlist({ params: { id } }: PlaylistProps) {
  const token = getSpotifyToken();
  return (
    <div className="page">
      <PlaylistInfo id={id} token={token} />
    </div>
  );
}
