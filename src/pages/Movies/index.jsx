import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useMovieData } from "../../hooks/useMovieData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";

const Movies = () => {
  const { data, isLoading, isError } = useMovieData();
  console.log("Movies data:", data);
  if (isLoading) return <Loading status={LoadingStatus.LOADING} />;

  if (isError) return <Loading status={LoadingStatus.NO_DATA} />;

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Movies;
