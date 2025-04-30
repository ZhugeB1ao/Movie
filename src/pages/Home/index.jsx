import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useHomeData } from "../../hooks/useHomeData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";

const Home = () => {
  const { data, isLoading, isError } = useHomeData();  

  if (isLoading) return <Loading status={LoadingStatus.LOADING} />;

  if (isError) return <Loading status={LoadingStatus.NO_DATA} />;

  return (
    <>
      <Header movie={data.featuredMovie} />
      <Body {...data.moviesData} />
    </>
  );
};

export default Home;
