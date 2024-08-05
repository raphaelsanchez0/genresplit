export class SpotifyAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpotifyAuthError";
  }
}

export class SpotifyTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpotifyTokenError";
  }
}

export class SpotifyDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpotifyDataError";
  }
}

export class SpotifyExchangeCodeForTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SpotifyExchangeCodeForTokenError";
  }
}
