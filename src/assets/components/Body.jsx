import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import MovieCard from "./MovieCard.jsx";
import { useState } from "react";

const Section = ({ title, movies, index }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  let swiperInstance = null;

  return (
    <div className="py-10 h-25vh">
      <h1 className="pb-4 pl-10 text-xl">{title}</h1>
      <div className="relative w-full h-44">
        <button
          className={`custom-prev-${index} absolute left-0 top-0 h-[100%] transform bg-black text-white p-2 z-10 rounded-tr-md rounded-br-md`}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`custom-next-${index} absolute right-0 top-0 h-[100%] transform bg-black text-white p-2 z-10 rounded-tl-md rounded-bl-md`}
        >
          <ChevronRight size={24} />
        </button>

        <div
          className="absolute top-0 left-[50px] right-[50px] h-full overflow-y-visible"
          style={{ width: "calc(100% - 100px)" }}
        >
          <Swiper
            slidesPerView={6}
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
            className="w-full overflow-visible"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} className="relative overflow-visible">
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute -top-3 right-0 w-1/6 h-1 bg-gray-500">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / movies.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Body = (moviesData) => {
  return (
    <div className="bg-[#141414] text-white w-[100vw]">
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
