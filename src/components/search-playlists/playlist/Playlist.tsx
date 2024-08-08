import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Colors } from "@/utils/constants";
import React from "react";

interface PlaylistProps {
  selected: boolean;
  onSelect: () => void;
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

export default function Playlist({
  playlist,
  selected,
  onSelect,
}: PlaylistProps) {
  console.log(playlist);
  return (
    <Card
      style={{ backgroundColor: selected ? Colors.ACCENT : "white" }}
      onClick={onSelect}
    >
      <div className="flex p-4">
        {playlist.images && <img src={playlist.images[0].url} width={100} />}
        <CardHeader>
          <CardTitle className="text-slate-950">{playlist.name}</CardTitle>
          <CardDescription>{playlist.owner.display_name}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
}
