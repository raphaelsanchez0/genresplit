import { cookieNames, localStorageKeys, spotify } from "./constants";
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
  responseType: string = defaultResponseType,
  scopes: string = spotify.SCOPES,
  showDialog = defaultShowDialog
) {
  console.log(getRedirectURI());
  return `${authEndpoint}?client_id=${clientID}&redirect_uri=${getRedirectURI()}&response_type=${responseType}&scope=${scopes}&show_dialog=${showDialog}`;
}

export function getSpotifyToken() {
  const code = localStorage.getItem(localStorageKeys.SPOTIFY_TOKEN);
  if (!code) {
    throw new SpotifyTokenError("No Token Found");
  }
  return code;
}

export function saveSpotifyToken(token: string) {
  localStorage.setItem(localStorageKeys.SPOTIFY_TOKEN, token);
}

export function getSpotifyTokenFromLocalStorage() {
  return localStorage.getItem(localStorageKeys.SPOTIFY_TOKEN);
}

export function getRedirectURI() {
  return process.env.NEXT_PUBLIC_REDIRECT_URI!;
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
      redirect_uri: getRedirectURI(),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new SpotifyExchangeCodeForTokenError(
      `Failed to exchange code for token: Status: ${
        response.status
      }, Body:${errorBody}, redirectURI: ${getRedirectURI()}`
    );
  }
  return response.json();
}
