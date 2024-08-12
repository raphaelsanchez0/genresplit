import { getArtistGenres } from "@/utils/api/artists/artists";
import { getPlaylistTracksTracksInPlaylists } from "@/utils/api/playlists/playlist";
import { GenreFrequency, PlaylistTrackObjectWithGenres } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useSortedGenres(
  selectedPlaylists: Set<string>,
  token: string
) {
  const [sortedGenres, setSortedGenres] = useState<GenreFrequency[]>([]);
  const [allTracksWithGenres, setAllTracksWithGenres] = useState<
    Set<PlaylistTrackObjectWithGenres>
  >(new Set());
  useEffect(() => {
    const addGenresToTracks = async () => {
      //Key: artistID, Value: Genres[]
      const artistGenres = new Map<string, string[]>();
      const genreCount = new Map<string, number>();
      const allTracksWithGenres = new Set<PlaylistTrackObjectWithGenres>();

      const allTracksWithoutGenres = await getPlaylistTracksTracksInPlaylists(
        selectedPlaylists,
        token
      );

      for await (const track of allTracksWithoutGenres) {
        const artistID = track.track?.artists[0]?.id!;
        let genres: string[] | undefined = artistGenres.get(artistID);
        if (!genres) {
          genres = await getArtistGenres(artistID, token);
          artistGenres.set(artistID, genres);
        }

        for (const genre of genres) {
          const currentCount = genreCount.get(genre) || 0;
          genreCount.set(genre, currentCount + 1);
        }

        allTracksWithGenres.add({
          ...track,
          genres: genres,
        });
      }

      const genresArray = Array.from(genreCount);
      const sortedGenresArray: GenreFrequency[] = genresArray
        .sort((a, b) => b[1] - a[1])
        .map(([genre, frequency]) => ({ genre, frequency }));

      setSortedGenres(sortedGenresArray);
      setAllTracksWithGenres(allTracksWithGenres);
    };

    addGenresToTracks();
  }, []);
  return { sortedGenres, allTracksWithGenres };
}
