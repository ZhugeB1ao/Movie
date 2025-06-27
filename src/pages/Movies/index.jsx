import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useMovieData } from "../../hooks/useMovieData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";
import { useState } from "react";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMovieData(page);

  if (isLoading) return <Loading status={LoadingStatus.LOADING} />;
  if (isError) return <Loading status={LoadingStatus.ERROR} />;
  if (!data) return <Loading status={LoadingStatus.LOADING} />;

  console.log("Fetched movie data:", data);
  return (
    <>
      <Header />
      <Body 
        movies={data}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
