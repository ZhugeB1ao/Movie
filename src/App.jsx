import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Movie from "./pages/Movie/index.jsx";
import TV from "./pages/TV/index.jsx";
import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
