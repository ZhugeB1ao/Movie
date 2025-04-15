import { useState } from "react";
import { useMovieDetail } from "../hooks/useMovieDetail.jsx";
import { useMovieTrailer } from "../hooks/useMovieTrailer.jsx";
import ReactPlayer from "react-player/youtube";

const MovieCard = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const { data: detail } = useMovieDetail(movie.id, hovered);
  const { data: trailer } = useMovieTrailer(movie.id, hovered);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-full relative bg-cover bg-center rounded-md transition-transform duration-300 ease-in-out ${
        hovered ? " z-30" : " z-0"
      }`}
      style={{
        height: hovered ? "264px" : "176px", 
        width: hovered ? "442px" : "295px",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    ></div>
  );
};

export default MovieCard;

// {hovered && trailer ? (
//   <ReactPlayer
//     url={`https://www.youtube.com/watch?v=${trailer.key}`}
//     playing
//     muted
//     loop
//     controls={false}
//     width="100%"
//     height="100%"
//     config={{
//       youtube: {
//         playerVars: {
//           modestbranding: 1,
//           showinfo: 0,
//           rel: 0,
//           controls: 0,
//           disablekb: 1,
//         },
//       },
//     }}
//   />
// ) : (
//   <div
//     className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
//     style={{
//       backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
//     }}
//   />
// )}
// {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white text-sm z-10">
//   <h3 className="text-lg font-semibold">{movie.title || movie.name}</h3> */}
// {hovered && detail && (
//   <p>Runtime: {detail.runtime ? `${detail.runtime} min` : "N/A"}</p>
// )}
// {hovered && detail?.genres?.length > 0 && (
//   <p>Genres: {detail.genres.map((g) => g.name).join(", ")}</p>
// )}
