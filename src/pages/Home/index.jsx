import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useHomeData } from "../../hooks/useHomeData.jsx";

const Home = () => {
  const { data, isLoading, isError } = useHomeData();

  if (isLoading)
    return <p className="text-center text-xl">Loading movies...</p>;
  if (isError)
    return <p className="text-center text-xl">Error loading data 😢</p>;

  return (
    <>
      <Header movie={data.featuredMovie} />
      <Body {...data.moviesData} />
    </>
  );
};

export default Home;
