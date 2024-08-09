import { getPlaylistTracks } from "../playlists/playlist";

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
