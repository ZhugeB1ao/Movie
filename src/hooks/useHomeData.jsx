import { useQuery } from "@tanstack/react-query";
import { useMovieGenres } from "./useMovieGenres.jsx";
import { useTVGenres } from "./useTVGenres.jsx";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieAPI.jsx";
import {
  fetchAiringTodayTV,
  fetchOnTheAirTV,
  fetchPopularTV,
  fetchTopRatedTV,
} from "../api/TVAPI.jsx";

export const useHomeData = () => {
  const { data: movieGenres, isLoading: isMovieGenresLoading } = useMovieGenres();
  const { data: tvGenres, isLoading: isTVGenresLoading } = useTVGenres();

  const isGenresLoaded = !!movieGenres && !!tvGenres;

  return useQuery({
    queryKey: ["home-movie-data", movieGenres, tvGenres],
    enabled: isGenresLoaded,
    queryFn: async () => {
      const [
        trendingMovies,
        nowPlayingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        airingTodayTV,
        onTheAirTV,
        popularTV,
        topRatedTV,
      ] = await Promise.all([
        fetchTrendingMovies(movieGenres),
        fetchNowPlayingMovies(movieGenres),
        fetchPopularMovies(movieGenres),
        fetchTopRatedMovies(movieGenres),
        fetchUpcomingMovies(movieGenres),
        fetchAiringTodayTV(tvGenres),
        fetchOnTheAirTV(tvGenres),
        fetchPopularTV(tvGenres),
        fetchTopRatedTV(tvGenres),
      ]);

      return {
        trendingMovies,
        nowPlayingMovies,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        airingTodayTV,
        onTheAirTV,
        popularTV,
        topRatedTV,
      };
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
