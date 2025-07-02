import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useMovieContext } from "../../contexts/MovieDataContext.jsx";
import { useMovieData } from "../../hooks/useMovieData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";
import { useState } from "react";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMovieData(page);
  const { moviePage1Data } = useMovieContext();

  useMovieData(page + 1); 

  const moviesForBody = page === 1 && moviePage1Data?.data ? moviePage1Data.data : data;

  if (isLoading && page !==1) return <Loading status={LoadingStatus.LOADING} />;
  if (isError) return <Loading status={LoadingStatus.ERROR} />;
  if (!moviesForBody) return <Loading status={LoadingStatus.LOADING} />;

  return (
    <>
      <Header />
      <Body 
        movies={moviesForBody}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
