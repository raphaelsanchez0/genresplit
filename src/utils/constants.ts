const spotifyClientID = process.env.SPOTIFY_CLIENT_ID;

if (!spotifyClientID) {
  throw new Error("No client ID environment variable");
}

export const spotify = {
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  CLIENT_ID: spotifyClientID,
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
};

export const cookieNames = {
  SPOTIFY_AUTH_CODE: "spotify_auth_code",
};
