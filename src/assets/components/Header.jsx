import { useState, useEffect } from "react";
import image from "../images/logo_dark.png";

const API_BASE_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Header = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movieLists, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);

      if (!data.results) {
        setErrorMessage("No movies found");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <header
      id="header"
      className="flex justify-center items-center px-16 py-40 m-0 bg-gray-800 text-white h-lvh w-full"
    >
      <div id="header-container">
        {isLoading ? (
          <p className="text-center text-xl">Loading movies...</p>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          movieLists.length > 0 && (
            <>
              <h1>{movieLists[0].title}</h1>
              <ul>
                <li>13+</li>
                <li>
                  <ul>
                    <li>Action</li>
                    <li>Science fiction</li>
                    <li>Comedy</li>
                  </ul>
                </li>
                <li>2023</li>
                <li>02h 29m</li>
              </ul>
              <div>
                <button>Play</button>
                <button>Watch trailer</button>
              </div>
              <p>{movieLists[0].overview || "No description available"}</p>
            </>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
