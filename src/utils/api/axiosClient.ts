import axios from "axios";
import { spotify } from "../constants";

export const SpotifyClient = axios.create({
  baseURL: spotify.BASE_URL,
});
