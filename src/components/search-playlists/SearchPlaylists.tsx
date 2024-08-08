"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SearchBar from "./search-bar/SearchBar";
import PlaylistList from "./playlists-list/PlaylistList";
import { getSpotifyToken } from "@/utils/authHelpers";

export default function SearchPlaylists({ token }: { token: string }) {
  return (
    <Card className="h-full w-3/4">
      <div className="flex flex-col items-center justify-center p-6 gap-4">
        <CardTitle className="text-5xl text-stone-950">
          Search Your Playlists
        </CardTitle>
        <SearchBar />
        <CardDescription className="text-md text-stone-950">
          Select one or more playlists to pick genres from
        </CardDescription>
        <PlaylistList token={token} />
      </div>
    </Card>
  );
}
