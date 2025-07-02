const MovieCard = ({ movie }) => {
  return (
    // <div className="rounded-md overflow-hidden aspect-[2/3] bg-gray-900">
    //   <img
    //     src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
    //     alt={movie.title || "Movie Poster"}
    //     className="object-cover w-full h-full"
    //     loading="lazy"
    //   />

    // </div>
    <div className="rounded-lg items-center">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full rounded-lg mb-2"
        loading="lazy"
      />
      <div className="text-white text-center text-lg font-medium m-5">
        {movie.title || movie.name}
      </div>
    </div>
  );
};

export default MovieCard;
