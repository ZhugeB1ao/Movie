// src/context/MovieContext.js
import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(null);

  return (
    <MovieContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
