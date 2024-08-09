"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import { getPlaylistTracks } from "@/utils/api/playlists/playlist";
import { getArtistsFrequencyInPlaylists } from "@/utils/api/artists/artists";
import { getGenreFrequencyAmongArtists } from "@/utils/api/genres/genres";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

  const [artists, setArtists] = useState<Map<string, number>>(new Map());
  const [genres, setGenres] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const getArtists = async () => {
      const artistMap = await getArtistsFrequencyInPlaylists(
        selectedPlaylists,
        token
      );
      const genresMap = await getGenreFrequencyAmongArtists(artistMap, token);
      console.log(genresMap);
    };

    getArtists();
  }, []);

  return <Card className="full-page-card"></Card>;
}
