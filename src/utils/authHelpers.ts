import { cookies } from "next/headers";
import { cookieNames, spotify } from "./constants";
import {
  SpotifyAuthError,
  SpotifyDataError,
  SpotifyTokenError,
} from "./errors";
import axios from "axios";

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

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${spotifyAuthCode}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new SpotifyDataError("Failed to fetch Spotify profile data");
    }
  } catch (error: any) {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        throw new SpotifyAuthError("Unauthorized access to Spotify API");
      } else {
        throw new SpotifyDataError(
          `Spotify API returned status ${error.response.status}`
        );
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
