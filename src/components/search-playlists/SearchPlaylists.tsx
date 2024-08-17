"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SearchBar from "./search-bar/SearchBar";
import PlaylistList from "./playlists-list/PlaylistList";
import { getSpotifyToken } from "@/utils/authHelpers";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchPlaylists() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPlaylistsParam = searchParams.get("selectedPlaylists");
  const atLeastOnePlaylistSelected = !!selectedPlaylistsParam;

  const handleSubmit = () => {
    router.push(`/select-genres?selectedPlaylists=${selectedPlaylistsParam}`);
  };

  return (
    <Card className="full-page-card">
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center justify-center p-6 gap-4 col-start-2 col-end-3">
          <CardTitle className="text-5xl text-stone-950">
            Search Your Playlists
          </CardTitle>
          <SearchBar />
          <CardDescription className="text-md text-stone-950">
            Select one or more playlists to pick genres from
          </CardDescription>
        </div>
        <div className="flex items-center justify-center">
          <Button disabled={!atLeastOnePlaylistSelected} onClick={handleSubmit}>
            Get Genres
          </Button>
        </div>
      </div>

      <PlaylistList />
    </Card>
  );
}
