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

export default function SelectGenres({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPlaylists = useSearchParamPlaylists({ searchParams });
  const [namePlaylistDialogOpen, setNamePlaylistDialogOpen] = useState(false);

  const playlistDetailsForm = useForm<
    z.infer<typeof playlistDetailsFormSchema>
  >({
    resolver: zodResolver(playlistDetailsFormSchema),
    defaultValues: {
      newPlaylistName: "",
      newPlaylistDescription: "",
    },
  });

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

    let newPlaylistTrackURIs: string[] = [];
    const selectedGenres = new Set(selectedGenresParam!.split(",") || []);
    allTracksWithGenres.forEach((track) => {
      if (track.genres.some((genre) => selectedGenres.has(genre))) {
        newPlaylistTrackURIs.push(track.track?.uri!);
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
      newPlaylistTrackURIs,
      token
    );

    router.push(`/playlist/${newPlaylistResponse.id}`);
  };

  if (loading) return <LoadingCard />;
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
              <Form {...playlistDetailsForm}>
                <form
                  onSubmit={playlistDetailsForm.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <DialogHeader className="font-semibold">
                    Add Details
                  </DialogHeader>
                  <DialogDescription>
                    Optionally name your playlist. If you don't name it, it will
                    be called "GenreSplit Playlist"
                  </DialogDescription>
                  <FormField
                    control={playlistDetailsForm.control}
                    name="newPlaylistName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="GenreSplit Playlist" {...field} />
                        </FormControl>
                        <FormMessage {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={playlistDetailsForm.control}
                    name="newPlaylistDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="This playlist was is based on..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage {...field} />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Create Playlist</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <GenresList genres={sortedGenres} token={token} />
    </Card>
  );
}

const playlistDetailsFormSchema = z.object({
  newPlaylistName: z.string().max(100).optional(),
  newPlaylistDescription: z.string().max(300).optional(),
});
