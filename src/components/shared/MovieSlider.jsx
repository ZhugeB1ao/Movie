import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MAX_PAGE = 20;

const MovieSlider = ({ items, page, setPage }) => {
  return (
  <Swiper
    modules={[Grid, Navigation, Pagination]}
    spaceBetween={20}
    slidesPerView={5}
    grid={{ rows: 4, fill: "row" }}
    className="px-10"
    navigation
    pagination={{ clickable: true }}
    onSlideChange={(swiper) => {
      // Nếu mỗi page là 1 API call, cập nhật page khi chuyển slide
      // swiper.realIndex bắt đầu từ 0
      if (setPage) {
        const newPage = swiper.realIndex + 1;
        if (newPage !== page && newPage <= MAX_PAGE) setPage(newPage);
      }
    }}
    initialSlide={page - 1}
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
  )
};

export default MovieSlider;