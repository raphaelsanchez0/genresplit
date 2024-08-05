"use client";
import { fetchPlaylistWithURL } from "@/utils/api/playlists/playlists";
import { getSpotifyToken } from "@/utils/authHelpers";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Playlist from "../playlist/Playlist";

export default function PlaylistList({ token }: { token: string }) {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (query) {
        const playlists: SpotifyApi.PlaylistSearchResponse =
          await fetchPlaylistWithURL(
            `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
            token
          );
        setPlaylists(playlists.playlists.items);
      } else {
        const playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
          await fetchPlaylistWithURL(
            `https://api.spotify.com/v1/me/playlists`,
            token
          );
        setPlaylists(playlists.items);
      }
    };

    fetchPlaylists();
  }, [query]);

  return (
    <div className="grid grid-cols-3 w-full">
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} selected={false} />
      ))}
    </div>
  );
}
