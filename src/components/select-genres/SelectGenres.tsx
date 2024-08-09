"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import { getPlaylistTracks } from "@/utils/api/playlists/playlist";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

  const [artists, setArtists] = useState<Map<string, number>>(new Map());
  const [genres, setGenres] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const getArtists = async () => {
      const artistMap = new Map<string, number>();

      for await (const playlistID of selectedPlaylists) {
        const tracks = await getPlaylistTracks(playlistID, token);
        for await (const track of tracks) {
          track.track?.artists?.forEach((artist) => {
            const currentCount = artistMap.get(artist.id) || 0;
            artistMap.set(artist.id, currentCount + 1);
          });
        }
      }

      setArtists(artistMap);
      debugger;
      console.log(artistMap);
    };

    getArtists();
  }, []);

  return <Card className="full-page-card"></Card>;
}
