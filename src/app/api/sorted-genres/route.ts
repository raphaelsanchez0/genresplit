import { getArtistGenres } from "@/utils/api/artists/artists";
import { getPlaylistTracksTracksInPlaylists } from "@/utils/api/playlists/playlist";
import { cookieNames } from "@/utils/constants";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const body = await request.json();
  const { selectedPlaylists, token } = await request.json();

  try {
    //Key: artistID, Value: Genres[]
    const artistGenres = new Map();
    const genreCount = new Map();
    const allTracksWithGenres = new Set();

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

    const sortedGenres = Array.from(genreCount)
      .sort((a, b) => b[1] - a[1])
      .map(([genre, frequency]) => ({ genre, frequency }));

    return Response.json({
      sortedGenres,
      allTracksWithGenres: Array.from(allTracksWithGenres),
    });
  } catch (error) {
    console.error("Error processing tracks and genres:", error);
    return Response.json(
      { error: "Failed to process genres" },
      { status: 500 }
    );
  }
}
