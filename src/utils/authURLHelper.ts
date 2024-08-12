import { getRedirectURI } from "./authHelpers";
import { spotify } from "./constants";
const defaultResponseType = "code";
const defaultShowDialog = true;
export function createAuthURL(
  authEndpoint: string = spotify.AUTH_ENDPOINT,
  clientID: string = spotify.CLIENT_ID,
  responseType: string = defaultResponseType,
  scopes: string = spotify.SCOPES,
  showDialog = defaultShowDialog
) {
  return `${authEndpoint}?client_id=${clientID}&redirect_uri=${getRedirectURI()}&response_type=${responseType}&scope=${scopes}&show_dialog=${showDialog}`;
}
