const spotifyClientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
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
  redirectURIs: {
    PRODUCTION: "http://localhost:3000/auth/callback/",
    DEVELOPMENT: "https://genresplit.vercel.app/auth/callback/",
  },

  BASE_URL: "https://api.spotify.com/v1",
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
};

export const cookieNames = {
  SPOTIFY_TOKEN: "spotify_token",
};

export const localStorageKeys = {
  SPOTIFY_TOKEN: "spotify_token",
};

export const Colors = {
  PRIMARY: "#223122",
  SECONDARY: "#192524",
  ACCENT: "#8acb88",
};
