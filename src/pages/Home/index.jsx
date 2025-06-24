import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useHomeData } from "../../hooks/useHomeData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";

const Home = () => {
  const { data, isLoading, isError } = useHomeData();  
  
  if (isLoading) return <Loading status={LoadingStatus.LOADING} />;
  if (isError) return <Loading status={LoadingStatus.ERROR} />;
  // if (!data) return <Loading status={LoadingStatus.NO_DATA} />

  const [ featuredMovie, ...restTrendingMovies ] = data.trendingMovies || [];
  console.log(">> Featured Movie:", featuredMovie);
  console.log(">> Rest Trending Movies:", restTrendingMovies);
  
  const { trendingMovies, ...moviesData } = data;
  console.log(">> Trending Movies:", trendingMovies);
  console.log(">> Movies Data:", moviesData);


  return (
    <>
      <Header movie={featuredMovie} />
      <Body trendingMovies={restTrendingMovies} {...moviesData} />
    </>
  );
};

export default Home;
