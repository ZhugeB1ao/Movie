import { useQuery } from "@tanstack/react-query";
import { fetchTVGenres } from "../api/TVAPI.jsx";

export const useTVGenres = () => {
    return useQuery({
        queryKey: ["tv-genres"],
        queryFn: fetchTVGenres,
        staleTime: 1000 * 60 * 60 , // Cache 24h
    });
};
