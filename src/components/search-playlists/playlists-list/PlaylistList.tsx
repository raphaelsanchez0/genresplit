"use client";
import { fetchPlaylistWithURL } from "@/utils/api/playlists/playlists";
import { getSpotifyAuthorizationCode } from "@/utils/authHelpers";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PlaylistList({ token }: { token: string }) {
  const [playlists, setPlaylists] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchPlaylists = async () => {
      let playlist;

      if (query) {
        playlist = await fetchPlaylistWithURL(
          `https://api.spotify.com/v1/search?q=${query}&type=playlist`,
          token
        );
      } else {
        playlist = await fetchPlaylistWithURL(
          "https://api.spotify.com/v1/browse/featured-playlists",
          token
        );
      }
      setPlaylists(playlist);
    };

    fetchPlaylists();
  }, [query]);

  return <div>PlaylistList</div>;
}
