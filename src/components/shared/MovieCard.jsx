const MovieCard = ({ movie }) => {

  return (
    <div
      className="rounded-md transition-transform duration-300 ease-in-out z-50 block "
      style={{
        height: "100%",
        width: "auto",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
      }}
      role="img"
      aria-label={movie.title || "Movie Poster"}
    >
      {/* <div className="rounded-md hidden xl:block h-full w-auto bg-cover bg-center" 
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      ></div> */}
    </div>
  );
};

export default MovieCard;
