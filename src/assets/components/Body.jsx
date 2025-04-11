import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import MovieCard from "./MovieCard.jsx";

const Section = ({ title, movies, index }) => {
  return (
    <div className="relative">
      <h1 className="pb-4 pl-10 text-xl">{title}</h1>

      <button
        className={`custom-prev-${index} absolute -left-8 top-1/2 transform bg-black text-white p-2 z-10 rounded-full`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={`custom-next-${index} absolute -right-8 top-1/2 transform bg-black text-white p-2 z-10 rounded-full`}
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        slidesPerView={6}
        slidesPerGroup={1}
        loop
        navigation={{
          nextEl: `.custom-next-${index}`,
          prevEl: `.custom-prev-${index}`,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="relative h-60"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Body = (moviesData) => {
  console.log(moviesData);
  return (
    <div className="px-8 pb-10 bg-[#141414] text-white">
      {Object.entries(moviesData).map(([category, movies], index) => (
        <Section
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

// const Section = ({ title, movies, index }) => {
//   return (
//     <div className="relative">
//       <h1 className="pb-4 pl-10 text-xl">{title}</h1>

//       <button className={`custom-prev-${index} absolute -left-8 top-1/2 transform bg-black text-white p-2 z-10 rounded-full `}>
//         <ChevronLeft size={24} />
//       </button>
//       <button className={`custom-next-${index} absolute -right-8 top-1/2 transform bg-black text-white p-2 z-10 rounded-full`}>
//         <ChevronRight size={24} />
//       </button>

//       <Swiper
//         slidesPerView={4}
//         slidesPerGroup={1}
//         loop={true}
//         navigation={{
//           nextEl: `.custom-next-${index}`,
//           prevEl: `.custom-prev-${index}`,
//         }}
//         pagination={{ clickable: true }}
//         modules={[Pagination, Navigation]}
//         className="relative h-60"
//       >
//         {movies.map((movie, index) => (
//           <SwiperSlide key={index} className="">
//             <div
//               key={movie.id}
//               className="h-[80%] relative m-4 hover:transform hover:scale-105 transition-transform duration-300"
//               style={{
//                 backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
//               }}
//             >
//               <h3 className="text-white text-lg font-semibold absolute bottom-0 left-2">
//                 {movie.title || movie.name}
//               </h3>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
