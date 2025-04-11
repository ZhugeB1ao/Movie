import { useQuery } from "@tanstack/react-query";
import { fetchMovieTrailer } from "../api/tmdb.jsx";

export const useMovieTrailer = (id, enabled) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchMovieTrailer(id),
    enabled,
    staleTime: 0,
    cacheTime: 1000,
  });
};