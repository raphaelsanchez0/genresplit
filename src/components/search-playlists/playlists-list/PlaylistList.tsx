"use client";
import { fetchSpotifyURL } from "@/utils/api/playlists/playlists";
import { getSpotifyToken } from "@/utils/authHelpers";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Playlist from "../playlist/Playlist";

export default function PlaylistList({ token }: { token: string }) {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");

  const selectedPlaylists = useMemo(() => {
    const selectedPlaylistsParam = searchParams.get("selectedPlaylists");
    return new Set(
      selectedPlaylistsParam ? selectedPlaylistsParam.split(",") : []
    );
  }, [searchParams]);

  const toggleSelectedPlaylist = (playlistID: string) => {
    const newSelectedPlaylists = new Set(selectedPlaylists);
    if (newSelectedPlaylists.has(playlistID)) {
      newSelectedPlaylists.delete(playlistID);
    } else {
      newSelectedPlaylists.add(playlistID);
    }
    const newSelectedPlaylistsArray = Array.from(newSelectedPlaylists);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(
      "selectedPlaylists",
      newSelectedPlaylistsArray.join(",")
    );
    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (query) {
        const playlists: SpotifyApi.PlaylistSearchResponse =
          await fetchSpotifyURL(
            `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
            token
          );
        setPlaylists(playlists.playlists.items);
      } else {
        const playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse =
          await fetchSpotifyURL(
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
        <Playlist
          key={playlist.id}
          playlist={playlist}
          selected={selectedPlaylists.has(playlist.id)}
          onSelect={() => toggleSelectedPlaylist(playlist.id)}
        />
      ))}
    </div>
  );
}
