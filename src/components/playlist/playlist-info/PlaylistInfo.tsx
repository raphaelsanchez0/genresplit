"use client";
import { Card } from "@/components/ui/card";
import { fetchSpotifyURL } from "@/utils/api/spotify";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Track from "../track/Track";
import { ExternalLink } from "lucide-react";
import NavigationButtons from "./navigation-buttons/NavigationButtons";
import { getSpotifyToken } from "@/utils/authHelpers";

interface PlaylistInfoProps {
  id: string;
}

export default function PlaylistInfo({ id }: PlaylistInfoProps) {
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();
  const [playlistTracks, setPlaylistTracks] =
    useState<SpotifyApi.PlaylistTrackResponse>();

  const token = getSpotifyToken();
  useEffect(() => {
    const getPlaylistInfo = async () => {
      const playlist: SpotifyApi.SinglePlaylistResponse = await fetchSpotifyURL(
        `https://api.spotify.com/v1/playlists/${id}`,
        token
      );

      const playlistID = playlist.id;
      const playlistTracks: SpotifyApi.PlaylistTrackResponse =
        await fetchSpotifyURL(
          `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          token
        );

      setPlaylist(playlist);
      setPlaylistTracks(playlistTracks);
    };

    getPlaylistInfo();
  });

  if (!playlist || !playlistTracks) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="full-page-card">
      <div className="flex-1 flex flex-col p-4">
        <Card className="basis-1/4 p-4">
          <NavigationButtons />
          <div className="flex flex-row gap-4">
            <div className="rounded-md overflow-hidden border">
              <img
                src={playlist.images[0].url}
                alt={`${playlist.name} Playlist Cover Image`}
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold">{playlist.name}</h1>
                <a href={playlist.external_urls.spotify} target="_blank">
                  <ExternalLink className="w-6 h-6 text-gray-600" />
                </a>
              </div>
              <p className="text-md text-gray-600">{playlist.description}</p>
              <p className="text-sm text-gray-600">
                {playlist.tracks.total} tracks
              </p>
            </div>
          </div>
        </Card>
        <div className="basis-3/4 p-4">
          <h2 className="text-2xl font-bold">Tracks</h2>
          {playlistTracks.items.map((track) => (
            <Track track={track} key={track?.track?.id} />
          ))}
        </div>
      </div>
    </Card>
  );
}
