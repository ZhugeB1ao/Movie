import { Routes, Route } from "react-router-dom";
import NavBar from "./assets/components/NavBar.jsx";
import Home from "./assets/pages/Home.jsx";
import Movie from "./assets/pages/Movie.jsx";
import TV from "./assets/pages/TV.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </>
  );
}

export default App;
