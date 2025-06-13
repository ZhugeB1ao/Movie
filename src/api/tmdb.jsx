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

export const fetchMoviesData = async (genresList) => {
  const categories = {
    // 🎬 Movie Categories
    "Trending Movies": "/trending/movie/week",
    "Popular Movies": "/movie/popular",
    "Top Rated Movies": "/movie/top_rated",
    "Upcoming Movies": "/movie/upcoming",
    "Now Playing Movies": "/movie/now_playing",

    // 📺 TV Categories
    "Trending TV Shows": "/trending/tv/week",
    "Popular TV Shows": "/tv/popular",
    "Top Rated TV Shows": "/tv/top_rated",
    "Airing Today TV Shows": "/tv/airing_today",
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

export const fetchNewMovies = async (genresList, page = 1, pageSize = 20) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let currentPage = 1;
  let validResults = [];

  while (validResults.length < endIndex && currentPage <= 10) {
    const res = await fetch(
      `${API_BASE_URL}/discover/movie?sort_by=primary_release_date.desc&page=${currentPage}`,
      API_OPTIONS
    );

    if (!res.ok) throw new Error("Failed to fetch new movies");

    const data = await res.json();

    const filtered = data.results
      .filter((movie) => movie.backdrop_path && movie.poster_path)
      .map((movie) => ({
        ...movie,
        genres: movie.genre_ids?.map((id) => genresList[id] || "Unknown") ?? [],
      }));

    validResults = [...validResults, ...filtered];
    currentPage++;
  }

  return validResults.slice(startIndex, endIndex);
};

export const fetchNewTVSeries = async (genresList, page = 1, pageSize = 20) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  let currentPage = 1;
  let validResults = [];

  while (validResults.length < endIndex && currentPage <= 10) {
    const res = await fetch(
      `${API_BASE_URL}/discover/tv?sort_by=first_air_date.desc&page=${currentPage}`,
      API_OPTIONS
    );

    if (!res.ok) throw new Error("Failed to fetch new TV shows");

    const data = await res.json();

    const filtered = data.results
      .filter((tv) => tv.backdrop_path && tv.poster_path)
      .map((tv) => ({
        ...tv,
        genres: tv.genre_ids?.map((id) => genresList[id] || "Unknown") ?? [],
      }));

    validResults = [...validResults, ...filtered];
    currentPage++;
  }

  return validResults.slice(startIndex, endIndex);
};
