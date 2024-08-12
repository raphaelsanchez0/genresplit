import { Card } from "@/components/ui/card";
import React from "react";

interface TrackProps {
  track: SpotifyApi.PlaylistTrackObject;
}

export default function Track({ track }: TrackProps) {
  return (
    <Card className="p-2">
      <div className="flex flex-row gap-2">
        <div className="rounded-md overflow-hidden border max-h-14">
          <img
            src={track?.track?.album.images[0].url}
            alt={`${track?.track?.name} Album Cover Image`}
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-bold">{track?.track?.name}</h1>
          <div className="flex">
            <p className="text-md text-gray-600">
              {track?.track?.artists[0].name}
            </p>
            <span className="my-2.5 mx-1 w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
            <p className="text-md text-gray-600">{track?.track?.album.name}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
