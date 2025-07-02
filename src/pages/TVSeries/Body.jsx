import MovieSlider from "../../components/shared/MovieSlider";

const Body = ({ tvs, page, setPage }) => {
  return (
    <div className="text-center">
      <MovieSlider items={tvs} page={page} setPage={setPage} />
    </div>
  );
};

export default Body;