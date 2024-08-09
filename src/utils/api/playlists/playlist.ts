import { fetchSpotifyURL } from "../spotify";

export async function getPlaylistTracks(
  playlistID: string,
  token: string
): Promise<Set<SpotifyApi.PlaylistTrackObject>> {
  let tracks = new Set<SpotifyApi.PlaylistTrackObject>();
  let nextURL:
    | string
    | null = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

  while (nextURL) {
    const response: SpotifyApi.PlaylistTrackResponse = await fetchSpotifyURL(
      nextURL,
      token
    );

    response.items.forEach((item) => {
      tracks.add(item);
    });
    nextURL = response.next;
  }

  return tracks;
}
