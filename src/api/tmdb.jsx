import { API_BASE_URL, API_OPTIONS } from "./constants.jsx";

export const fetchGenres = async () => {
  const res = await fetch(
    `${API_BASE_URL}/genre/movie/list?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

export const fetchMoviesData = async (genresList, page=2) => {

  const categories = {
    // 🎬 Movie Categories
    "Trending Movies": "/trending/movie/week",
    "Popular Movies": "/movie/popular",
    "Top Rated Movies": "/movie/top_rated",
    "Upcoming Movies": "/movie/upcoming",
    "Now Playing Movies": "/movie/now_playing",
    "New Movies": `/discover/movie?sort_by=primary_release_date.desc&primary_release_date.desc&page=${page}`,

    // 📺 TV Categories
    "Trending TV Shows": "/trending/tv/week",
    "Popular TV Shows": "/tv/popular",
    "Top Rated TV Shows": "/tv/top_rated",
    "Airing Today TV Shows": "/tv/airing_today",
    "New TV Shows": `/discover/tv?sort_by=first_air_date.desc&first_air_date.desc&page=${page}`,
  };

  const moviesPromises = Object.entries(categories).map(
    async ([key, endpoint]) => {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS);
      if (!res.ok) throw new Error(`Failed to fetch ${key}`);
      const data = await res.json();
      return {
        [key]: data.results.map((item) => ({
          ...item,
          genres:
            item.genre_ids?.map((id) => genresList[id] || "Unknown") ?? [],
        })),
      };
    }
  );

  const moviesArray = await Promise.all(moviesPromises);
  return Object.assign({}, ...moviesArray);
};

export const fetchMovieDetail = async (movieId, mediaType = "movie") => {
  const res = await fetch(
    `${API_BASE_URL}/${mediaType}/${movieId}?append_to_response=videos`,
    API_OPTIONS
  );
  const data = await res.json();

  return {
    runtime: data.runtime,
    trailer: data.videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ),
  };
};

export const fetchMovieTrailer = async (movieId) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${movieId}/videos?language=en-US`,
    API_OPTIONS
  );
  const data = await res.json();
  return (
    data.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null
  );
};
