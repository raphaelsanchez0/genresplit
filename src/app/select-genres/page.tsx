import { getSpotifyToken } from "@/utils/authHelpers";
import SelectGenres from "@/components/select-genres/SelectGenres";
import { Suspense } from "react";
import LoadingCard from "@/components/loading-card/LoadingCard";

export default function SelectGenresPage() {
  return (
    <div className="page">
      <Suspense>
        <SelectGenres />
      </Suspense>
    </div>
  );
}
