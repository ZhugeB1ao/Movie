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
  const [buttonWidth, setButtonWidth] = useState(0);

  const updateButtonWidth = (swiper) => {
  if (!swiper || !swiper.width) {
    console.error("Swiper width is not available");
    return;
  }

  const containerWidth = swiper.width;
  let spv = swiper.params.slidesPerView;

  if (typeof spv === "function") spv = spv();

  if (!spv || typeof spv !== "number") {
    console.error("Invalid slidesPerView value:", spv);
    return;
  }

  const fractional = spv % 1;
  const slideWidth = containerWidth / spv;
  const spaceBetween = swiper.params.spaceBetween || 0;
  const width = fractional > 0 ? slideWidth * fractional - (spaceBetween * 2 - 2) : slideWidth * 0.1 - (spaceBetween * 2 - 2); 
  setButtonWidth(width/2);
};
  // eslint-disable-next-line no-unused-vars
  let swiperInstance = null;

  return (
    <>
      <h1 className="pl-10 pt-10 text-xl">{title}</h1>
      <div
        className="mt-10 relative
                    h-[25vh] md:h-[25vh] lg:h-[20vh]"
      >
        <button
          className={`custom-prev-${index} transform text-white bg-black opacity-70 z-20 rounded-tr-md rounded-br-md absolute left-0 top-0 flex justify-center items-center h-full`}
          style={{ width: `${buttonWidth}px` }}
        >
          <ChevronLeft size={24} />
        </button>

        <Swiper
          slidesPerView={3.6}
          breakpoints={{
            768: { slidesPerView: 5.6 }, // md
            // 1024: { slidesPerView: 5.6 }, // lg
            // 1280: { slidesPerView: 5.6 }, // xl
          }}
          centeredSlides={true}
          spaceBetween={10}
          slidesPerGroup={1}
          loop
          onSwiper={(swiper) => {
            swiperInstance = swiper;
            updateButtonWidth(swiper);
          }}
          onResize={(swiper) => {
            updateButtonWidth(swiper);
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
            <SwiperSlide
              key={movie.id}
              className="h-full w-full absolute left-0 top-0 z-10"
            >
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`custom-next-${index} transform text-white bg-black opacity-70 z-20 rounded-tl-md rounded-bl-md absolute right-0 top-0 flex justify-center items-center h-full`}
          style={{ width: `${buttonWidth}px` }}
        >
          <ChevronRight size={24} />
        </button>
        {/* </div> */}

        <div className="absolute -top-3 right-3 w-1/6 h-1 bg-gray-500">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{
              width: `${((activeIndex + 1) / movies.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MovieSection;
