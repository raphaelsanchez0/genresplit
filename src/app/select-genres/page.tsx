import { getSpotifyToken } from "@/utils/authHelpers";
import SelectGenres from "@/components/select-genres/SelectGenres";

export default () => {
  const token = getSpotifyToken();
  return (
    <div className="page">
      <SelectGenres token={token} />
    </div>
  );
};
