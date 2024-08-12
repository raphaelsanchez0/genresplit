import { PlaylistTrackObjectWithGenres } from "@/utils/types";
import { createPostRequestHeaders, fetchSpotifyURL } from "../spotify";

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
  const headers = createPostRequestHeaders(token);
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

export function addPrefixToUri(uris: string[], type = "track") {
  const uriPrefix = `spotify:${type}`;

  const fullUris = uris.map((uri) => `${uriPrefix}${uri}`);
  const uriString = fullUris.join(",");
  return encodeURIComponent(uriString);
}

export async function addSongsToPlaylist(
  playlistID: string,
  uris: string[],
  token: string
) {
  const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

  const response = await fetch(url, {
    method: "POST",
    headers: createPostRequestHeaders(token),
    body: JSON.stringify({
      uris: uris,
    }),
  });
  if (!response.ok) {
    throw new Error(`Error adding songs to playlist: ${response.status}`);
  }
  console.log(response);

  const data: SpotifyApi.AddTracksToPlaylistResponse = await response.json();
  return data;
}

export async function createPlaylistFromGenres(
  selectedGenres: Set<string>,
  allTracksWithGenres: Set<PlaylistTrackObjectWithGenres>,
  userID: string,
  newPlaylistName: string | undefined,
  newPlaylistDescription: string | undefined,
  token: string,
  isPublic: boolean = true
) {
  let newPlaylistTrackURIs: string[] = [];

  allTracksWithGenres.forEach((track) => {
    if (track.genres.some((genre) => selectedGenres.has(genre))) {
      newPlaylistTrackURIs.push(track.track?.uri!);
    }
  });
  const newPlaylistResponse = await createPlaylist(
    userID,
    newPlaylistName || "GenreSplit Playlist",
    newPlaylistDescription || "",
    isPublic,
    token
  );

  const addSongsToPlaylistResponse = await addSongsToPlaylist(
    newPlaylistResponse.id,
    newPlaylistTrackURIs,
    token
  );

  return addSongsToPlaylistResponse;
}
