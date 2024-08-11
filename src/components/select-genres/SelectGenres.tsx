"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import {
  createPlaylist,
  getPlaylistTracks,
  getPlaylistTracksTracksInPlaylists,
} from "@/utils/api/playlists/playlist";
import {
  getArtistGenres,
  getArtistsFrequencyInPlaylists,
} from "@/utils/api/artists/artists";
import { getGenreFrequencyAmongArtists } from "@/utils/api/genres/genres";
import { GenreFrequency, PlaylistTrackObjectWithGenres } from "@/utils/types";
import GenresList from "./genres-list/GenresList";
import useSearchParamGenres from "@/hooks/useSearchParamGenres";
import { Button } from "../ui/button";
import useSortedGenres from "./useSortedGenres";
import { getAuthenticatedUserID } from "@/utils/api/user/user";

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });

  const sortedGenres = useSortedGenres(selectedPlaylists, token);

  const selectedGenresParam = searchParams.get("selectedGenres");
  const atLeastOneGenreSelected = !!selectedGenresParam;
  const handleSubmit = async () => {
    const userID = await getAuthenticatedUserID(token);
    createPlaylist(userID, "test playlist", "test description", true, token);
  };
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
        <div className="flex items-center justify-center">
          <Button disabled={!atLeastOneGenreSelected} onClick={handleSubmit}>
            Get Genres
          </Button>
        </div>
      </div>
      <GenresList genres={sortedGenres} token={token} />
    </Card>
  );
}
