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
  return allTracks;
}

export async function createPlaylist(
  userID: string,
  name: string,
  description: string,
  isPublic: boolean,
  token: string
) {
  const url = "https://api.spotify.com/v1/users/abccool2020/playlists";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: name,
      description: description,
      public: isPublic,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error, Status ${response.status}`);
  }
  return response.json();
}
