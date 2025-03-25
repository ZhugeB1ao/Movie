const API_BASE_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

export const fetchGenres = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/genre/movie/list?language=en-US`, API_OPTIONS);
        const data = await response.json();
        return data.genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching genres:", error);
        return {};
    }
};

export const fetchMoviesData = async (genresList) => {
    try {
        const categories = {
            "Trending Movies": "/trending/movie/week",
            "Top Rated Movies": "/movie/top_rated",
            "Trending TV Shows": "/trending/tv/week",
            "Top Rated TV Shows": "/tv/top_rated",
        };

        const moviesPromises = Object.entries(categories).map(async ([key, endpoint]) => {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS);
            const data = await response.json();
            return {
                [key]: data.results.map(movie => ({
                    ...movie,
                    genres: movie.genre_ids.map(id => genresList[id] || "Unknown"),
                }))
            };
        });

        const moviesArray = await Promise.all(moviesPromises);

        // const moviesArray = [
        //     { "Trending Movies": [{ id: 1, title: "Movie A" }, {id: 3, title: "Movie C"}] },
        //     { "Top Rated Movies": [{ id: 2, title: "Movie B" }] },
        // ];

        return Object.assign({}, ...moviesArray);
        // return {
        //     "Trending Movies": [{ id: 1, title: "Movie A" }],
        //     "Top Rated Movies": [{ id: 2, title: "Movie B" }]
        // }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return {};
    }
};


