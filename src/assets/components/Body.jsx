import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";

const Section = ({ title, movies }) => {
  return (
    <Swiper
      slidesPerView={4}
      slidesPerGroup={1}
      loop={true}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation]}
      className="relative bg-[#141414] text-white h-40"
    >
      {/* {movies.map((group, index) => (
        <SwiperSlide key={index} className="p-4">
          <div className="flex gap-4">
            {group.map((movie) => (
              <div
                key={movie.id}
                className="w-1/5 h-48 bg-cover bg-center rounded-lg relative transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
                }}
              >
                <h3 className="text-white text-lg font-semibold absolute bottom-0 left-1 text">
                  {movie.title || movie.name}
                </h3>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))} */}
      <SwiperSlide>111</SwiperSlide>
    </Swiper>
  );
};

const Body = (moviesData) => {
    console.log(moviesData)
  return (
    <div>
      {Object.entries(moviesData).map(([category, movies]) => (
        <Section key={category} title={category} movies={movies} />
      ))}
    </div>
  );
};

export default Body;
//
// const chunkArrayWithOverlap = (arr, size) => {
//     let result = [];
//     for (let i = 0; i < arr.length; i += size) {
//         let chunk = arr.slice(i, i + size);
//         if (i + size >= arr.length && chunk.length < size) {
//             let prevChunk = result[result.length - 1];
//             if (prevChunk) {
//                 let lastItem = prevChunk[prevChunk.length - 1];
//                 chunk.unshift(lastItem);
//             }
//         }
//         result.push(chunk);
//     }
//     return result;
// };
//
// const Section = ({ title, movies }) => {
//     const movieGroups = chunkArrayWithOverlap(movies, 5);
//     const swiperRef = useRef(null);
//     const [showPrev, setShowPrev] = useState(false);
//
//     const handleNext = () => {
//         if (swiperRef.current) {
//             swiperRef.current.slideNext();
//             setShowPrev(true);
//         }
//     };
//
//     const handlePrev = () => {
//         if (swiperRef.current) {
//             swiperRef.current.slidePrev();
//             if (swiperRef.current.realIndex === 0) setShowPrev(false);
//         }
//     };
//
//     return (
//         <div className="relative">
//             <h2 className="bg-[#141414] text-white px-12">{title}</h2>
//             <div className="flex items-center relative bg-[#141414]">
//                 {showPrev && (
//                     <button
//                         className="absolute left-0 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-110"
//                         onClick={handlePrev}
//                     >
//                         ◀
//                     </button>
//                 )}
//                 <div className="w-full overflow-hidden">
//                     <Swiper
//                         modules={[Navigation]}
//                         spaceBetween={10}
//                         slidesPerView={1}
//                         slidesPerGroup={1}
//                         loop={true}
//                         allowTouchMove={false}
//                         onSwiper={(swiper) => (swiperRef.current = swiper)}
//                     >
//                         {movieGroups.map((group, index) => (
//                             <SwiperSlide key={index} className="p-4">
//                                 <div className="flex gap-4">
//                                     {group.map((movie) => (
//                                         <div
//                                             key={movie.id}
//                                             className="w-1/5 h-48 bg-cover bg-center rounded-lg relative transition-transform duration-300 hover:scale-105"
//                                             style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` }}
//                                         >
//                                             <h3 className="text-white text-lg font-semibold absolute bottom-0 left-1 text">
//                                                 {movie.title || movie.name}
//                                             </h3>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//                 {movieGroups.length > 1 && (
//                     <button
//                         className="absolute right-0 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-110"
//                         onClick={handleNext}
//                     >
//                         ▶
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// const Body = (moviesData ) => {
//     return (
//         <div>
//             {Object.entries(moviesData).map(([category, movies]) => (
//                 <Section key={category} title={category} movies={movies} />
//             ))}
//         </div>
//     );
// };
//
// export default Body;
