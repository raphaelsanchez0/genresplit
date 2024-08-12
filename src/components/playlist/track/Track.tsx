import { Card } from "@/components/ui/card";
import React from "react";

interface TrackProps {
  track: SpotifyApi.PlaylistTrackObject;
}

export default function Track({ track }: TrackProps) {
  return (
    <Card>
      <div className="flex flex-row gap-4">
        <div className="rounded-md overflow-hidden border">
          <img
            src={track?.track?.album.images[0].url}
            alt={`${track?.track?.name} Album Cover Image`}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{track?.track?.name}</h1>
          <p className="text-md text-gray-600">
            {track?.track?.artists[0].name}
          </p>
          <p className="text-sm text-gray-600">{track?.track?.album.name}</p>
        </div>
      </div>
    </Card>
  );
}
