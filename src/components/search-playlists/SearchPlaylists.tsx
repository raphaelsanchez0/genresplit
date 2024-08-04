import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SearchBar from "./search-bar/SearchBar";

export default function SearchPlaylists() {
  return (
    <Card className="h-full w-3/4">
      <div className="flex flex-col items-center justify-center p-6">
        <CardTitle className="text-5xl text-stone-950">
          Search Playlists
        </CardTitle>
        <SearchBar />
        <CardDescription>
          Search and select playlists for splitting. Whatever you choose will be
          aggregated for you to split into playlists of new genres
        </CardDescription>
      </div>
    </Card>
  );
}
