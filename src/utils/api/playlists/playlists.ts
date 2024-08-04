import { SpotifyClient } from "../axiosClient";

export async function getFeaturedPlaylists() {
  const res = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists"
  );
}
