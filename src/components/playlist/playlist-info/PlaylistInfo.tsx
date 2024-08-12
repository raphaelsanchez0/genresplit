import { Card } from "@/components/ui/card";
import { fetchSpotifyURL } from "@/utils/api/spotify";
import React from "react";
import Image from "next/image";

interface PlaylistInfoProps {
  id: string;
  token: string;
}

export default async function PlaylistInfo({ id, token }: PlaylistInfoProps) {
  const playlist: SpotifyApi.SinglePlaylistResponse = await fetchSpotifyURL(
    `https://api.spotify.com/v1/playlists/${id}`,
    token
  );
  return (
    <Card className="full-page-card">
      <div className="flex-1 flex flex-row p-4">
        <Card className="basis-1/3 p-4">
          <div className="flex flex-col items-center">
            {/* <Image
              src={playlist.images[0].url}
              alt={`${playlist.name} Playlist Cover Image`}
              width={300}
              height={300}
            /> */}
            <div className="rounded-md overflow-hidden border">
              <img
                src={playlist.images[0].url}
                alt={`${playlist.name} Playlist Cover Image`}
                width={300}
                height={300}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{playlist.name}</h1>
              <p className="text-md text-stone-950">{playlist.description}</p>
              <p className="text-md text-stone-950">
                {playlist.tracks.total} tracks
              </p>
            </div>
          </div>
        </Card>
        <div className="basis-2/3"></div>
      </div>
    </Card>
  );
}
