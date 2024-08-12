import { getPlaylistTracks } from "../playlists/playlist";
import { fetchSpotifyURL } from "../spotify";

export async function getArtistsFrequencyInPlaylists(
  playlists: Set<string>,
  token: string
) {
  const artistMap = new Map<string, number>();
  for await (const playlistID of playlists) {
    const tracks = await getPlaylistTracks(playlistID, token);
    for await (const track of tracks) {
      track.track?.artists?.forEach((artist) => {
        const currentCount = artistMap.get(artist.id) || 0;
        artistMap.set(artist.id, currentCount + 1);
      });
    }
  }

  return artistMap;
}

export async function getArtistGenres(artistID: string, token: string) {
  const response: SpotifyApi.SingleArtistResponse = await fetchSpotifyURL(
    `https://api.spotify.com/v1/artists/${artistID}`,
    token
  );
  return response.genres;
}
