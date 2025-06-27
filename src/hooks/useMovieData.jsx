import { useQuery } from "@tanstack/react-query";
import { useMovieGenres } from "./useMovieGenres";
import { fetchPopularMovies } from "../api/movieAPI";

export const useMovieData = ( page ) => {
    const { data: movieGenres } = useMovieGenres();

    return useQuery({
        queryKey: ["movie-data", movieGenres, page],
        enabled: !!movieGenres, 
        queryFn: () => fetchPopularMovies(movieGenres, page),
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
}