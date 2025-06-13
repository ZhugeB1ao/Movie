import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/index.jsx";
import Movies from "./pages/Movies/index.jsx";
import TVSeries from "./pages/TVSeries/index.jsx";

import NavBar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.jsx";
import { LoadingStatus } from "./assets/constant/loadingConst.js";

function App() {
  const loadingStatus = LoadingStatus.PAGE_NOT_FOUND;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/TVSeries" element={<TVSeries />} />
        <Route path="*" element={<Loading status={loadingStatus} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
