import {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import Body from "../components/Body.jsx";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [genresList, setGenresList] = useState({});

    const fetchGenres = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/genre/movie/list?language=en-US`, API_OPTIONS);
            const data = await response.json();

            if (data.genres) {
                const genreMap = {};
                data.genres.forEach((genre) => {
                    genreMap[genre.id] = genre.name;
                });
                setGenresList(genreMap);
            }
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/movie/${movieId}?language=en-US`, API_OPTIONS);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching movie details:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            await fetchGenres();
            try {
                const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS);
                const data = await response.json();

                if (data.results.length > 0) {
                    const moviesWithGenres = data.results.map(movie => ({
                        ...movie,
                        genres: movie.genre_ids.map(id => genresList[id] || "Unknown")
                    }));

                    const movieDetails = await fetchMovieDetails(data.results[0].id);
                    setMovies([{ ...movieDetails, genres: movieDetails.genres.map(g => g.name) }, ...moviesWithGenres.slice(1)]);
                } else {
                    setMovies([]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return isLoading ? (
        <p className="text-center text-xl">Loading movies...</p>
    ) : (
        <>
            <Header movie={movies[0]}/>
            <Body movies={movies}/>
        </>
    );
}

export default Home;