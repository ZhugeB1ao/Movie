import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieDataContext.jsx";
import { useMovieGenres } from "./useMovieGenres.jsx";
import { useTVGenres } from "./useTVGenres.jsx";
import { useMovieData } from "./useMovieData.jsx";
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
  const { setMovieData } = useMovieContext();
  const { data: moviePage1Data, isSuccess: isMovieDataLoaded } = useMovieData(1);

  const { data: movieGenres } = useMovieGenres();
  const { data: tvGenres } = useTVGenres();
  const isGenresLoaded = !!movieGenres && !!tvGenres;

  useEffect(() => {
    if (isMovieDataLoaded) {
      setMovieData(moviePage1Data);
    }
  }, [isMovieDataLoaded, moviePage1Data, setMovieData]);

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
