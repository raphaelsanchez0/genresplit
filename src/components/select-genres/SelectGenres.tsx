"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import { getPlaylistTracks } from "@/utils/api/playlists/playlist";
import { getArtistsFrequencyInPlaylists } from "@/utils/api/artists/artists";
import { getGenreFrequencyAmongArtists } from "@/utils/api/genres/genres";
import { GenreFrequency } from "@/utils/types";
import GenresList from "../genres-list/GenresList";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

  const [artists, setArtists] = useState<Map<string, number>>(new Map());
  const [sortedGenres, setSortedGenres] = useState<GenreFrequency[]>([]);

  useEffect(() => {
    const getArtists = async () => {
      const artistMap = await getArtistsFrequencyInPlaylists(
        selectedPlaylists,
        token
      );
      const genresMap = await getGenreFrequencyAmongArtists(artistMap, token);
      const sortedGenresArray: GenreFrequency[] = Array.from(genresMap)
        .sort((a, b) => b[1] - a[1])
        .map(([genre, frequency]) => ({ genre, frequency }));
      setSortedGenres(sortedGenresArray);
      console.log(sortedGenresArray);
    };

    getArtists();
  }, []);
  return (
    <Card className="full-page-card">
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center justify-center p-6 gap-4 col-start-2 col-end-3">
          <CardTitle className="text-5xl text-stone-950 text-center">
            Select Genres
          </CardTitle>
          <CardDescription className="text-md text-stone-950 text-center">
            Select the genres you want to include in your new playlist
          </CardDescription>
        </div>
      </div>
      <GenresList genres={sortedGenres} token={token} />
    </Card>
  );
}
