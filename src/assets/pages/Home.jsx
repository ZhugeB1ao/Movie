import Header from "../components/Header.jsx";
import Body from "../components/Body.jsx";
import Footer from "../components/Footer.jsx";
import { useHomeData } from "../hooks/useHomeData.jsx";

const Home = () => {
  const { data, isLoading, isError } = useHomeData();

  if (isLoading) return <p className="text-center text-xl">Loading movies...</p>;
  if (isError) return <p className="text-center text-xl">Error loading data 😢</p>;

  return (
    <>
      <Header movie={data.featuredMovie} />
      <Body {...data.moviesData} />
      <Footer />
    </>
  );
};

export default Home;


// import { useEffect, useState } from "react";
// import Header from "../components/Header.jsx";
// import Body from "../components/Body.jsx";
// import Footer from "../components/Footer.jsx";
// import { fetchGenres, fetchMoviesData } from "../api/fetchMovie.jsx";

// const Home = () => {
//     const [moviesData, setMoviesData] = useState({});
//     const [featuredMovie, setFeaturedMovie] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);

//             const genresList = await fetchGenres();
//             const movies = await fetchMoviesData(genresList);

//             const [firstMovie, ...remainingTrendingMovies] = movies["Trending Movies"] || [];

//             setFeaturedMovie(firstMovie);

//             setMoviesData({
//                 ...movies,
//                 "Trending Movies": remainingTrendingMovies,
//             });

//             setIsLoading(false);
//         };

//         fetchData();
//     }, []);

//     return isLoading ? (
//         <p className="text-center text-xl">Loading movies...</p>
//     ) : (
//         <>
//             <Header movie={featuredMovie} />
//             <Body {...moviesData} />
//             <Footer />
//         </>
//     );
// };

// export default Home;
