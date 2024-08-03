import { spotify } from "./constants";

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
