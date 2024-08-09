import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useSearchParamPlaylist({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const selectedPlaylists = useMemo(() => {
    const selectedPlaylistsParam = searchParams.get("selectedPlaylists");
    return new Set(
      selectedPlaylistsParam ? selectedPlaylistsParam.split(",") : []
    );
  }, [searchParams]);

  return selectedPlaylists;
}
