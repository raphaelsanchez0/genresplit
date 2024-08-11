import { fetchSpotifyURL } from "../spotify";

export async function getAuthenticatedUserID(token: string) {
  const response: SpotifyApi.UserProfileResponse = await fetchSpotifyURL(
    "https://api.spotify.com/v1/me",
    token
  );

  return response.id;
}
