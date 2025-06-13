import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchNewMovies } from "../api/tmdb.jsx";

export const useMovieData = (page = 1) => {
  return useQuery({
    queryKey: ["new-movies", page],
    queryFn: async () => {
      const genres = await fetchGenres();
      const newMovies = await fetchNewMovies(genres, page);

      console.log("useMovieData - newMovies:", newMovies);
      // return newMovies;
    },
    staleTime: 1000 * 60 * 10,
    keepPreviousData: true,
  });
};

