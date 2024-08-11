export interface GenreFrequency {
  genre: string;
  frequency: number;
}

export interface PlaylistTrackObjectWithGenres
  extends SpotifyApi.PlaylistTrackObject {
  genres: string[];
}
