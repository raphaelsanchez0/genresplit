"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import useSearchParamPlaylists from "@/hooks/useSearchParamPlaylists";
import {
  addSongsToPlaylist,
  createPlaylist,
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

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });
  const [newPlaylistNameInput, setNewPlaylistNameInput] = useState("");
  const [namePlaylistDialogOpen, setNamePlaylistDialogOpen] = useState(false);

  const { sortedGenres, allTracksWithGenres } = useSortedGenres(
    selectedPlaylists,
    token
  );

  const selectedGenresParam = searchParams.get("selectedGenres");

  const atLeastOneGenreSelected = !!selectedGenresParam;
  const handleSubmit = async () => {
    const userID = await getAuthenticatedUserID(token);

    let newPlaylistTrackURIs: string[] = [];
    const selectedGenres = new Set(selectedGenresParam!.split(",") || []);
    allTracksWithGenres.forEach((track) => {
      if (track.genres.some((genre) => selectedGenres.has(genre))) {
        newPlaylistTrackURIs.push(track.track?.uri!);
      }
    });

    const newPlaylistName = newPlaylistNameInput || "GenreSplit Playlist";
    const newPlaylistResponse = await createPlaylist(
      userID,
      newPlaylistName,
      "test",
      true,
      token
    );

    const addSongsToPlaylistResponse = await addSongsToPlaylist(
      newPlaylistResponse.id,
      newPlaylistTrackURIs,
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
          <Dialog
            open={namePlaylistDialogOpen}
            onOpenChange={setNamePlaylistDialogOpen}
          >
            <DialogTrigger asChild>
              <Button disabled={!atLeastOneGenreSelected}>
                Create Playlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Name your Playlist</DialogHeader>
              <DialogDescription>
                Optionally name your playlist. If you don't name it, it will be
                called "GenreSplit Playlist"
              </DialogDescription>
              <div className="flex gap-4 items-center">
                <Label
                  htmlFor="playlist-name"
                  className="text-right whitespace-nowrap"
                >
                  Playlist Name
                </Label>
                <Input
                  id="playlist-name"
                  placeholder="GenreSplit Playlist"
                  value={newPlaylistNameInput}
                  onChange={(e) => setNewPlaylistNameInput(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit} type="submit">
                  Create Playlist
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <GenresList genres={sortedGenres} token={token} />
    </Card>
  );
}
