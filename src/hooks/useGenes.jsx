import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api/tmdb.jsx";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60 * 24, // Cache 24h
  });
};

