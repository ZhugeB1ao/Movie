import { API_BASE_URL, API_OPTIONS } from "./constants.jsx";

export const fetchTVGenres = async () => {
  const res = await fetch(
    `${API_BASE_URL}/genre/tv/list?language=en-US`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error("Failed to fetch TV genres");
  const data = await res.json();
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

const fetchTVByType = async (type, genresList, page = 1) => {
  const res = await fetch(
    `${API_BASE_URL}/tv/${type}?language=en-US&page=${page}`,
    API_OPTIONS
  );
  if (!res.ok) throw new Error(`Failed to fetch ${type} TV shows`);
  const { results = [] } = await res.json();

  console.log(`>> Fetched ${type} TV shows:`, results);

  return results.map(({ genre_ids = [], ...tv }) => ({
    ...tv,
    genres: genre_ids.map((id) => genresList[id] ?? "Unknown"),
  }));
};

export const fetchAiringTodayTV = (genresList, page = 1) =>
  fetchTVByType("airing_today", genresList, page);

export const fetchOnTheAirTV = (genresList, page = 1) =>
  fetchTVByType("on_the_air", genresList, page);

export const fetchPopularTV = (genresList, page = 1) =>
  fetchTVByType("popular", genresList, page);

export const fetchTopRatedTV = (genresList, page = 1) =>
  fetchTVByType("top_rated", genresList, page);
