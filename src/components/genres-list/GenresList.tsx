import { GenreFrequency } from "@/utils/types";

export default function GenresList({
  token,
  genres,
}: {
  token: string;
  genres: GenreFrequency[];
}) {
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
