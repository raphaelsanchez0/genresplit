import { Button } from "@/components/ui/button";
import { Colors } from "@/utils/constants";
import { GenreFrequency } from "@/utils/types";
import React from "react";

interface GenreProps extends GenreFrequency {
  onSelect: (genre: string) => void;
  selected: boolean;
}

export default function Genre({
  genre,
  frequency,
  onSelect,
  selected,
}: GenreProps) {
  return (
    <Button
      key={genre}
      className="flex items-center justify-between border"
      onClick={() => onSelect(genre)}
      style={{ backgroundColor: selected ? Colors.ACCENT : "white" }}
    >
      <p className="text-stone-950">{genre}</p>
      <p className="text-stone-950">{frequency}</p>
    </Button>
  );
}
