import { useQuery } from "@tanstack/react-query";
import { useMovieGenres } from "./useMovieGenres.jsx";
import { useTVGenres } from "./useTVGenres.jsx";
// import { usePopularMovies } from "./usePopularMovies.jsx";
import {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieAPI.jsx";
import {
  fetchAiringTodayTV,
  fetchPopularTV,
  fetchTopRatedTV,
} from "../api/TVAPI.jsx";

export const useHomeData = () => {
  const { data: movieGenres, isLoading: isMovieGenresLoading } = useMovieGenres();
  const { data: tvGenres, isLoading: isTVGenresLoading } = useTVGenres();

  const isGenresLoaded = !!movieGenres && !!tvGenres;

  // const { data: popularMovies, isLoading: isPopularMoviesLoading } = usePopularMovies();
  
  return useQuery({
    queryKey: ["home-data", movieGenres, tvGenres],
    enabled: isGenresLoaded,
    queryFn: async () => {
      const [
        TrendingMovies,
        NowPlayingMovies,
        TopRatedMovies,
        UpcomingMovies,
        AiringTodayTV,
        PopularTV,
        TopRatedTV,
      ] = await Promise.all([
        fetchTrendingMovies(movieGenres),
        fetchNowPlayingMovies(movieGenres),
        fetchTopRatedMovies(movieGenres),
        fetchUpcomingMovies(movieGenres),
        fetchAiringTodayTV(tvGenres),
        fetchPopularTV(tvGenres),
        fetchTopRatedTV(tvGenres),
      ]);

      return {
        TrendingMovies,
        NowPlayingMovies,
        TopRatedMovies,
        UpcomingMovies,
        AiringTodayTV,
        PopularTV,
        TopRatedTV,
      };
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};
