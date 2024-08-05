const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!spotifyClientSecret) {
  throw new Error("No client Secret environment variable");
}

export const spotify = {
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  CLIENT_ID: "420d2cfc497641c4965d36181d8c04a9",
  CLIENT_SECRET: spotifyClientSecret,
  SCOPES: [
    "playlist-modify-public",
    "playlist-read-private",
    "user-library-read",
    "user-read-private",
    "user-read-email",
    "playlist-read-collaborative",
  ].join(" "),
  REDIRECT_URI: "http://localhost:3000/auth/callback/",
  BASE_URL: "https://api.spotify.com/v1",

  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
};

export const cookieNames = {
  SPOTIFY_AUTH_CODE: "spotify_auth_token",
};
