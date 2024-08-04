import { cookies } from "next/headers";
import { cookieNames, spotify } from "./constants";
import {
  SpotifyAuthError,
  SpotifyDataError,
  SpotifyTokenError,
} from "./errors";

const defaultResponseType = "code";
const defaultShowDialog = true;

export function createAuthURL(
  authEndpoint: string = spotify.AUTH_ENDPOINT,
  clientID: string = spotify.CLIENT_ID,
  redirectURI: string = spotify.REDIRECT_URI,
  responseType: string = defaultResponseType,
  scopes: string = spotify.SCOPES,
  showDialog = defaultShowDialog
) {
  return `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&show_dialog=${showDialog}`;
}

export async function getUser() {
  const cookieStore = cookies();
  const spotifyAuthCode = cookieStore.get(cookieNames.SPOTIFY_AUTH_CODE)?.value;

  if (!spotifyAuthCode) {
    throw new SpotifyAuthError("Spotify authorization code is missing");
  }

  if (spotifyAuthCode) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${spotifyAuthCode}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new SpotifyDataError("Failed to fetch Spotify profile data");
  }
  throw new SpotifyAuthError("Spotify authorization code is missing");
}

export async function userAuthenticated() {
  try {
    await getUser();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
