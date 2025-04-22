import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard from "./MovieCard.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieSection = ({ title, movies, index }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let swiperInstance = null;

  return (
    <>
      <h1 className="pb-4 pl-10 text-xl">{title}</h1>
      <div className="py-10 relative
                    h-[35vh] md:h-[30vh] lg:h-[25vh]">
        <div className="flex w-full h-full items-center justify-center ">
          <button
            className={`custom-prev-${index} transform transparent text-white p-2 z-10 rounded-tr-md rounded-br-md`}
          >
            <ChevronLeft size={24} />
          </button>

          {/* <div
          className="absolute top-0 left-[50px] right-[50px] h-full rounded-md"
          style={{ width: "calc(100% - 100px)" }}
        > */}
          <Swiper
            slidesPerView={3}
            breakpoints={{
              768: { slidesPerView: 5 }, // md
              1024: { slidesPerView: 6 }, // lg
            }}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerGroup={1}
            loop
            onSwiper={(swiper) => {
              swiperInstance = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            navigation={{
              nextEl: `.custom-next-${index}`,
              prevEl: `.custom-prev-${index}`,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="w-full h-full"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} className="h-full w-full">
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={`custom-next-${index}  transform opacity-50 text-white p-2 z-10 rounded-tl-md rounded-bl-md`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute -top-3 right-0 w-1/6 h-1 bg-gray-500">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{
              width: `${((activeIndex + 1) / movies.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default MovieSection;
