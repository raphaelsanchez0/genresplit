"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import {
  getPlaylistTracks,
  getPlaylistTracksTracksInPlaylists,
} from "@/utils/api/playlists/playlist";
import {
  getArtistGenres,
  getArtistsFrequencyInPlaylists,
} from "@/utils/api/artists/artists";
import { getGenreFrequencyAmongArtists } from "@/utils/api/genres/genres";
import { GenreFrequency, PlaylistTrackObjectWithGenres } from "@/utils/types";
import GenresList from "../genres-list/GenresList";
import useSearchParamGenres from "@/hooks/useSearchParamGenres";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });
  const router = useRouter();

  const [artists, setArtists] = useState<Map<string, number>>(new Map());
  const [sortedGenres, setSortedGenres] = useState<GenreFrequency[]>([]);

  const selectedGenres = useSearchParamGenres(searchParams);

  useEffect(() => {
    const addGenresToTracks = async () => {
      //Key: artistID, Value: Genres[]
      const artistGenres = new Map<string, string[]>();
      const genreCount = new Map<string, number>();
      const allTracksWithGenres = new Set<PlaylistTrackObjectWithGenres>();

      const allTracksWithoutGenres = await getPlaylistTracksTracksInPlaylists(
        selectedPlaylists,
        token
      );

      for await (const track of allTracksWithoutGenres) {
        const artistID = track.track?.artists[0]?.id!;
        let genres: string[] | undefined = artistGenres.get(artistID);
        if (!genres) {
          genres = await getArtistGenres(artistID, token);
          artistGenres.set(artistID, genres);
        }

        for (const genre of genres) {
          const currentCount = genreCount.get(genre) || 0;
          genreCount.set(genre, currentCount + 1);
        }

        allTracksWithGenres.add({
          ...track,
          genres: genres,
        });
      }

      const genresArray = Array.from(genreCount);
      const sortedGenresArray: GenreFrequency[] = genresArray
        .sort((a, b) => b[1] - a[1])
        .map(([genre, frequency]) => ({ genre, frequency }));

      console.log(sortedGenresArray);

      setSortedGenres(sortedGenresArray);
    };

    addGenresToTracks();
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
