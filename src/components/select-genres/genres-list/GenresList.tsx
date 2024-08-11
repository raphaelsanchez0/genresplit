import useSearchParamGenres from "@/hooks/useSearchParamGenres";
import { GenreFrequency } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";

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
        <div
          key={genre.genre}
          className="flex items-center justify-between p-4 border border-stone-200 rounded-lg"
        >
          <p className="text-stone-950">{genre.genre}</p>
          <p className="text-stone-950">{genre.frequency}</p>
        </div>
      ))}
    </div>
  );
}
