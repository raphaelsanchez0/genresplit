import { getSpotifyToken } from "@/utils/authHelpers";
import SelectGenres from "@/components/select-genres/SelectGenres";

export default function SelectGenresPage() {
  return (
    <div className="page">
      <SelectGenres />
    </div>
  );
}
