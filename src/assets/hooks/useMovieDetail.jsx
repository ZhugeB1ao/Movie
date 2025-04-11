import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../api/tmdb.jsx";

export const useMovieDetail = (id, enabled) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    enabled,
    staleTime: 0,
    cacheTime: 1000,
  });
};
