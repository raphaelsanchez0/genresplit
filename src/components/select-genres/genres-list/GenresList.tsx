import useSearchParamGenres from "@/hooks/useSearchParamGenres";
import { GenreFrequency } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import Genre from "../genre/Genre";
import LoadingCard from "@/components/loading-card/LoadingCard";

interface GenresListProps {
  token: string;
  genres: GenreFrequency[];
  loading: boolean;
}

export default function GenresList({
  token,
  genres,
  loading,
}: GenresListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedGenres = useSearchParamGenres(searchParams);

  const toggleSelectedGenres = (genre: string) => {
    const newSelectedGenres = new Set(selectedGenres);
    if (newSelectedGenres.has(genre)) {
      newSelectedGenres.delete(genre);
    } else {
      newSelectedGenres.add(genre);
    }
    const newSelectedGenresArray = Array.from(newSelectedGenres);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("selectedGenres", newSelectedGenresArray.join(","));
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  if (loading) return <LoadingCard />;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {genres.map((genre) => (
        <Genre
          key={genre.genre}
          {...genre}
          onSelect={toggleSelectedGenres}
          selected={selectedGenres.has(genre.genre)}
        />
      ))}
    </div>
  );
}
