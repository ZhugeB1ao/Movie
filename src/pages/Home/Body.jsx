import MovieSection from "../../components/shared/MovieSection";

const Body = (moviesData) => {
  return (
    <div className="bg-[#141414] text-white w-[100vw] ">
      {Object.entries(moviesData).map(([category, movies], index) => (
        <MovieSection
          key={category}
          title={category}
          movies={movies}
          index={index}
        />
      ))}
    </div>
  );
};

export default Body;
