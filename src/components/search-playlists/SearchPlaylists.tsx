"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import PlaylistList from "./playlists-list/PlaylistList";
import SearchBar from "./search-bar/SearchBar";

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
      <div className="md:grid md:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-6 gap-4 col-start-2 col-end-3">
          <CardTitle className="md:text-5xl text-xl text-center text-stone-950">
            Search Your Playlists
          </CardTitle>
          <SearchBar />
          <CardDescription className="text-md text-stone-950">
            Select one or more playlists to pick genres from
          </CardDescription>
        </div>
        <div className="flex items-center justify-center mb-2 md:mb-0">
          <Button disabled={!atLeastOnePlaylistSelected} onClick={handleSubmit}>
            Get Genres
          </Button>
        </div>
      </div>

      <PlaylistList />
    </Card>
  );
}
