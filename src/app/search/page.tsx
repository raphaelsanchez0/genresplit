import SearchPlaylists from "@/components/search-playlists/SearchPlaylists";
import React, { Suspense } from "react";

export default function Search() {
  return (
    <div className="page">
      <Suspense>
        <SearchPlaylists />
      </Suspense>
    </div>
  );
}
