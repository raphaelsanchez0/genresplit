import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function useSearchParamGenres(
  searchParams: ReadonlyURLSearchParams
) {
  const selectedGenres = useMemo(() => {
    const selectedGenresParam = searchParams.get("selectedGenres");
    return new Set(selectedGenresParam ? selectedGenresParam.split(",") : []);
  }, [searchParams]);

  return selectedGenres;
}
