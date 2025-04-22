import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchMoviesData } from "../api/tmdb.jsx";

export const useHomeData = () => {
  return useQuery({
    queryKey: ["home-movie-data"],
    queryFn: async () => {
      const genresList = await fetchGenres();
      const movies = await fetchMoviesData(genresList);

      const [featuredMovie, ...restTrendingMovies] = movies["Trending Movies"] || [];

      return {
        featuredMovie,
        moviesData: {
          ...movies,
          "Trending Movies": restTrendingMovies, 
        },
      };
    },
    staleTime: 1000 * 60 * 10, 
    retry: 1, 
  });
};
