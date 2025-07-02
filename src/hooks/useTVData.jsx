import { useQuery } from "@tanstack/react-query";
import { useTVGenres } from "./useTVGenres";
import { fetchPopularTV } from "../api/TVAPI";

export const useTVData = ( page ) => {
    const { data: tvGenres } = useTVGenres();
    return useQuery({
        queryKey: ["tv-data", tvGenres, page],
        enabled: !!tvGenres, 
        queryFn: () => {
            const popularTV = fetchPopularTV(tvGenres, page);
            console.log(`Fetched popular tvs for page ${page}:`, popularTV);
            return popularTV
        },
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
}