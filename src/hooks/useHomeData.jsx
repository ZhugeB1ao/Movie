import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieDataContext.jsx";
import { useTVContext } from "../contexts/TVDataContext.jsx";
import { useMovieGenres } from "./useMovieGenres.jsx";
import { useTVGenres } from "./useTVGenres.jsx";
import { useMovieData } from "./useMovieData.jsx";
import { useTVData } from "./useTVData.jsx";
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

  const { setTVData } = useTVContext();
  const { data: tvPage1Data, isSuccess: isTVDataLoaded } = useTVData(1);

  const { data: movieGenres } = useMovieGenres();
  const { data: tvGenres } = useTVGenres();
  const isGenresLoaded = !!movieGenres && !!tvGenres;

  useEffect(() => {
    if (isMovieDataLoaded && isTVDataLoaded) {
      setMovieData(moviePage1Data);
      setTVData(tvPage1Data);
    }
  }, [
    isMovieDataLoaded,
    isTVDataLoaded,
    moviePage1Data,
    tvPage1Data,
    setMovieData,
    setTVData,
  ]);

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
