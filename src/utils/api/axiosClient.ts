import axios from "axios";
import { spotify } from "../constants";
import { getSpotifyAuthorizationCode } from "../authHelpers";
import { config } from "process";
import { SpotifyTokenError } from "../errors";

export const SpotifyClient = axios.create({
  baseURL: spotify.BASE_URL,
});

export function setAuthTokenFromCookies() {
  const token = getSpotifyAuthorizationCode();
  if (token) {
    SpotifyClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    return new SpotifyTokenError("No Error Found");
  }
}
