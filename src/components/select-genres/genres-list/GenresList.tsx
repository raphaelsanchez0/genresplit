import useSearchParamGenres from "@/hooks/useSearchParamGenres";
import { GenreFrequency } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import Genre from "../genre/Genre";

export default function GenresList({
  token,
  genres,
}: {
  token: string;
  genres: GenreFrequency[];
}) {
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
