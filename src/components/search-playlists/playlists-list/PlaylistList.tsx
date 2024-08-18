"use client";
import { fetchSpotifyURL } from "@/utils/api/spotify";
import { getSpotifyToken } from "@/utils/authHelpers";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Playlist from "../playlist/Playlist";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import LoadingCard from "@/components/loading-card/LoadingCard";

export default function PlaylistList() {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");

  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

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
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const token = getSpotifyToken();
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
      setLoading(false);
    };

    fetchPlaylists();
  }, [query]);

  if (loading) return <LoadingCard />;

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-2 px-2">
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
