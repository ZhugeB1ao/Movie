import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchGenres,
  fetchMoviesData,
  fetchNewMovies,
  fetchNewTVSeries,
} from "../api/tmdb.jsx";

export const useHomeData = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["home-movie-data"],
    queryFn: async () => {
      const genresList = await fetchGenres();
      const movies = await fetchMoviesData(genresList);
      const newMovie = await fetchNewMovies(genresList, 1);
      const newTVSeries = await fetchNewTVSeries(genresList, 1);

      queryClient.setQueryData(["new-movies", 1], newMovie);
      queryClient.setQueryData(["new-tv-series", 1], newTVSeries);

      const [featuredMovie, ...restTrendingMovies] =
        movies["Trending Movies"] || [];

      console.log("movies", movies);
      console.log("restTrendingMovies", restTrendingMovies);
      console.log("newMovie", newMovie);
      console.log("newTVShow", newTVSeries);

      return {
        featuredMovie,
        moviesData: {
          ...movies,
          "Trending Movies": restTrendingMovies,
          // newMovies: newMovie,
          // newTVShows: newTVShow,
        },
      };
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
