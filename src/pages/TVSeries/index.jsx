import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { useTVContext } from "../../contexts/TVDataContext.jsx";
import { useTVData } from "../../hooks/useTVData.jsx";
import Loading from "../../components/Loading.jsx";
import { LoadingStatus } from "../../assets/constant/loadingConst.js";
import { useState } from "react";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useTVData(page);
  const { tvPage1Data } = useTVContext();

  useTVData(page + 1); 

  const tvsForBody = page === 1 && tvPage1Data?.data ? tvPage1Data.data : data;

  if (isLoading && page !==1) return <Loading status={LoadingStatus.LOADING} />;
  if (isError) return <Loading status={LoadingStatus.ERROR} />;
  if (!tvsForBody) return <Loading status={LoadingStatus.LOADING} />;

  return (
    <>
      <Header />
      <Body 
        tvs={tvsForBody}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Movies;
