import MovieSlider from "../../components/shared/MovieSlider";

const Body = ({ movies, page, setPage }) => {
  return (
    <div className="text-center">
      <MovieSlider items={movies} page={page} setPage={setPage} />
    </div>
  );
};

export default Body;