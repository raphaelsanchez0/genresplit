import { getSpotifyToken } from "@/utils/authHelpers";
import SelectGenres from "@/components/select-genres/SelectGenres";

export default function SelectGenresPage() {
  const token = getSpotifyToken();
  return (
    <div className="page">
      <SelectGenres token={token} />
    </div>
  );
}
