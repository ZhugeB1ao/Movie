import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres } from "../api/movieAPI.jsx";

export const useMovieGenres = () => {
  return useQuery({
    queryKey: ["movie-genres"],
    queryFn: fetchMovieGenres,
    staleTime: 1000 * 60 * 60, // Cache 1h
  });
};

