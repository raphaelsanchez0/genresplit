import { getArtistGenres } from "../artists/artists";

export async function getGenreFrequencyAmongArtists(
  artistMap: Map<string, number>,
  token: string
) {
  const genresMap = new Map<string, number>();
  for await (const [artistID, artistFrequency] of artistMap.entries()) {
    const genres = await getArtistGenres(artistID, token);
    for await (const genre of genres) {
      const currentCount = genresMap.get(genre) || 0;
      genresMap.set(genre, currentCount + artistFrequency);
      //Adds the genre the number of times the artists shows up
    }
  }
  return genresMap;
}
