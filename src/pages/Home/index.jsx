import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useHomeData } from "../../hooks/useHomeData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";

const Home = () => {
  const { data, isLoading, isError } = useHomeData();  
  
  if (isLoading) return <Loading status={LoadingStatus.LOADING} />;
  if (isError) return <Loading status={LoadingStatus.ERROR} />;
  if (!data) return <Loading status={LoadingStatus.LOADING} />

  const [ featuredMovie, ...restTrendingMovies ] = data.TrendingMovies || [];
  const { trendingMovies, ...moviesData } = data;

  return (
    <>
      <Header movie={featuredMovie} />
      <Body TrendingMovies={restTrendingMovies} {...moviesData} />
    </>
  );
};

export default Home;
