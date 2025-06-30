import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MAX_PAGE = 20;

const MovieSlider = ({ items, page, setPage }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Grid, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        grid={{ rows: 4, fill: "row" }}
        onSlideChange={(swiper) => {
          if (setPage) {
            const newPage = swiper.realIndex + 1;
            if (newPage !== page && newPage <= MAX_PAGE) setPage(newPage);
          }
        }}
        initialSlide={page - 1}
        pagination={{ clickable: true, type: "bullets" }}
        className="px-10"
      >
        {items?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-gray-800 p-3 rounded-lg flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full rounded-lg mb-2"
              />
              <div className="text-white text-center text-sm font-medium">
                {item.title || item.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage && setPage((p) => Math.max(1, p - 1))}
          type="button"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="text-black text-lg font-semibold min-w-[90px]">
          Page {page} / {MAX_PAGE}
        </div>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2 disabled:opacity-50"
          disabled={page === MAX_PAGE}
          onClick={() => setPage && setPage((p) => Math.min(MAX_PAGE, p + 1))}
          type="button"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
