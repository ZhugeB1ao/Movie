import { API_BASE_URL, API_OPTIONS } from "./constants.jsx";

export const fetchMovieGenres = async () => {
  const res = await fetch(
    `${API_BASE_URL}/genre/movie/list?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  console.log("Fetched movie genres:", data.genres);
  
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

// {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
// }

const fetchMoviesByType = async (type, genresList, page = 1) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${type}?language=en-US&page=${page}`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} movies`);
  const { results = [] } = await res.json();  
  return results.map(({ genre_ids = [], ...movie }) => ({
    ...movie,
    genres: genre_ids.map((id) => genresList[id] ?? "Unknown"),   
  }));
};

export const fetchNowPlayingMovies = (genresList, page = 1) =>
  fetchMoviesByType("now_playing", genresList, page);

export const fetchPopularMovies = (genresList, page = 1) =>
  fetchMoviesByType("popular", genresList, page);

export const fetchTopRatedMovies = (genresList, page = 1) =>
  fetchMoviesByType("top_rated", genresList, page);

export const fetchUpcomingMovies = (genresList, page = 1) =>
  fetchMoviesByType("upcoming", genresList, page);

export const fetchTrendingMovies = async (genresList, page = 1) => {
  const res = await fetch(
    `${API_BASE_URL}/trending/movie/week?language=en-US&page=${page}`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");

  const { results = [] } = await res.json();
  return results.map(({ genre_ids = [], ...movie }) => ({
    ...movie,
    genres: genre_ids.map((id) => genresList[id] ?? "Unknown"),
  }));
};

// {
//   "adult": false,
//   "backdrop_path": "/uIpJPDNFoeX0TVml9smPrs9KUVx.jpg",
//   "genre_ids": [
//     27,
//     9648
//   ],
//   "id": 574475,
//   "original_language": "en",
//   "original_title": "Final Destination Bloodlines",
//   "overview": "Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.",
//   "popularity": 954.9084,
//   "poster_path": "/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg",
//   "release_date": "2025-05-14",
//   "title": "Final Destination Bloodlines",
//   "video": false,
//   "vote_average": 7.22,
//   "vote_count": 1230,
//   "genres": ["Horror", "Mystery"]
// }