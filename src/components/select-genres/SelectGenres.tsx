"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import {
  addSongsToPlaylist,
  createPlaylist,
  createPlaylistFromGenres,
  getPlaylistTracks,
  getPlaylistTracksTracksInPlaylists,
} from "@/utils/api/playlists/playlist";
import {
  getArtistGenres,
  getArtistsFrequencyInPlaylists,
} from "@/utils/api/artists/artists";
import GenresList from "./genres-list/GenresList";
import useSearchParamGenres from "@/hooks/useSearchParamGenres";
import { Button } from "../ui/button";
import useSortedGenres from "./useSortedGenres";
import { getAuthenticatedUserID } from "@/utils/api/user/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Skeleton } from "../ui/skeleton";
import LoadingCard from "../loading-card/LoadingCard";
import PlaylistDetailsDialog, {
  playlistDetailsFormSchema,
} from "./playlist-details-dialog/PlaylistDetailsDialog";
import { useToast } from "../ui/use-toast";
import { getSpotifyToken } from "@/utils/authHelpers";

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
