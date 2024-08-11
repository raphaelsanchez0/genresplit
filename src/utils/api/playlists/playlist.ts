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

export async function getPlaylistTracksTracksInPlaylists(
  playlists: Set<string>,
  token: string
) {
  let allTracks = new Set<SpotifyApi.PlaylistTrackObject>();
  for await (const playlistID of playlists) {
    const tracksInPlaylist = await getPlaylistTracks(playlistID, token);
    const tracksArray = Array.from(tracksInPlaylist);
    for (const track of tracksArray) {
      allTracks.add(track);
    }
  }
  return allTracks
}
