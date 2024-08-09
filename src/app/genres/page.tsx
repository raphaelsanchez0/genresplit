import { getSpotifyToken } from "@/utils/authHelpers";

export default function Genres() {
  const token = getSpotifyToken();
  return (
    <div className="page">
      <h1>Genres</h1>
    </div>
  );
}
