import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Playlist({
  playlist,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}) {
  console.log(playlist);
  return (
    <Card>
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
