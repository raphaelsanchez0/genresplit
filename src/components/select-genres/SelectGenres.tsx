"use client";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import {
  addSongsToPlaylist,
  createPlaylist,
} from "@/utils/api/playlists/playlist";
import { getAuthenticatedUserID } from "@/utils/api/user/user";
import { getSpotifyToken } from "@/utils/authHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { useToast } from "../ui/use-toast";
import GenresList from "./genres-list/GenresList";
import PlaylistDetailsDialog, {
  playlistDetailsFormSchema,
} from "./playlist-details-dialog/PlaylistDetailsDialog";
import useSortedGenres from "./useSortedGenres";

export default function SelectGenres() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });
  const [namePlaylistDialogOpen, setNamePlaylistDialogOpen] = useState(false);
  const token = getSpotifyToken();

  const { sortedGenres, allTracksWithGenres, loading } = useSortedGenres(
    selectedPlaylists,
    token
  );

  const selectedGenresParam = searchParams.get("selectedGenres");
  const atLeastOneGenreSelected = !!selectedGenresParam;

  const onSubmit = async (
    values: z.infer<typeof playlistDetailsFormSchema>
  ) => {
    const userID = await getAuthenticatedUserID(token);
    const selectedGenres = new Set(selectedGenresParam!.split(",") || []);

    let newPlaylistTrackURIs = new Set<string>();

    allTracksWithGenres.forEach((track) => {
      if (track.genres.some((genre) => selectedGenres.has(genre))) {
        newPlaylistTrackURIs.add(track.track?.uri!);
      }
    });

    const newPlaylistName = values.newPlaylistName || "GenreSplit Playlist";
    const newPlaylistResponse = await createPlaylist(
      userID,
      newPlaylistName,
      values.newPlaylistDescription || "",
      true,
      token
    );

    const addSongsToPlaylistResponse = await addSongsToPlaylist(
      newPlaylistResponse.id,
      Array.from(newPlaylistTrackURIs),
      token
    );

    router.push(`/playlist/${newPlaylistResponse.id}`);
  };

  return (
    <Card className="full-page-card">
      <div className="md:grid md:grid-cols-3 flex flex-col">
        <div className="flex flex-col items-center justify-center p-6 gap-4 col-start-2 col-end-3">
          <CardTitle className="text-5xl text-stone-950 text-center">
            Select Genres
          </CardTitle>
          <CardDescription className="text-md text-stone-950 text-center">
            Select the genres you want to include in your new playlist
          </CardDescription>
        </div>
        <div className="flex items-center justify-center">
          <PlaylistDetailsDialog
            namePlaylistDialogOpen={namePlaylistDialogOpen}
            setNamePlaylistDialogOpen={setNamePlaylistDialogOpen}
            atLeastOneGenreSelected={atLeastOneGenreSelected}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      <GenresList genres={sortedGenres} token={token} loading={loading} />
    </Card>
  );
}
