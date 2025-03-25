import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Body from "../components/Body.jsx";
import { fetchGenres, fetchMoviesData } from "../api/fetchMovie.jsx";

const Home = () => {
    const [moviesData, setMoviesData] = useState({});
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const genresList = await fetchGenres();
            const movies = await fetchMoviesData(genresList);

            const [firstMovie, ...remainingTrendingMovies] = movies["Trending Movies"] || [];

            setFeaturedMovie(firstMovie);

            setMoviesData({
                ...movies,
                "Trending Movies": remainingTrendingMovies,
            });

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return isLoading ? (
        <p className="text-center text-xl">Loading movies...</p>
    ) : (
        <>
            <Header movie={featuredMovie} />
            <Body {...moviesData} />
        </>
    );
};

export default Home;
