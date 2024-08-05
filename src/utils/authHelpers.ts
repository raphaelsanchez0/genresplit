import { cookies } from "next/headers";
import { cookieNames, spotify } from "./constants";
import {
  SpotifyAuthError,
  SpotifyDataError,
  SpotifyExchangeCodeForTokenError,
  SpotifyTokenError,
} from "./errors";

const defaultResponseType = "code";
const defaultShowDialog = true;

export function createAuthURL(
  authEndpoint: string = spotify.AUTH_ENDPOINT,
  clientID: string = spotify.CLIENT_ID,
  clientSecret: string = spotify.CLIENT_SECRET,
  redirectURI: string = spotify.REDIRECT_URI,
  responseType: string = defaultResponseType,
  scopes: string = spotify.SCOPES,
  showDialog = defaultShowDialog
) {
  return `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&show_dialog=${showDialog}`;
}

export async function exchangeCodeForToken(code: string): Promise<any> {
  const response = await fetch(spotify.TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(spotify.CLIENT_ID + ":" + spotify.CLIENT_SECRET).toString(
          "base64"
        ),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: spotify.REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new SpotifyExchangeCodeForTokenError(
      "Failed to exchange code for token"
    );
  }
  return response.json();
}

export async function getUser() {
  const cookieStore = cookies();
  const spotifyAuthCode = cookieStore.get(cookieNames.SPOTIFY_TOKEN)?.value;

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
    return false;
  }
}

export function getSpotifyToken() {
  const code = cookies().get(cookieNames.SPOTIFY_TOKEN)?.value;
  if (!code) {
    throw new SpotifyTokenError("No Token Found");
  }
  return code;
}
