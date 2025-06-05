import { useState, useRef, useEffect } from "react";
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

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [overlayStyle, setOverlayStyle] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayTimeout = useRef(null);
  const slideRefs = useRef([]);
  const overlayIdxRef = useRef(null);

  const updateOverlayPosition = (idx) => {
    const rect = slideRefs.current[idx]?.getBoundingClientRect();
    if (rect) {
      const extra = 80;
      setOverlayStyle({
        display: "block",
        position: "fixed",
        left: rect.left - extra ,
        top: rect.top - extra / 2,
        width: rect.width + extra * 2,
        height: rect.height + extra ,
        background: "black",
        zIndex: 9999,
        pointerEvents: "auto",
        opacity: 1,
        transition: "opacity 0.5s",
        borderRadius: "12px",
      });
    }
  };

  useEffect(() => {
    if (showOverlay && hoveredIndex !== null) {
      const handleUpdate = () => updateOverlayPosition(hoveredIndex);
      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);
      // Cập nhật ngay khi mount
      handleUpdate();
      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, [showOverlay, hoveredIndex]);

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
    const width =
      fractional > 0
        ? slideWidth * fractional - (spaceBetween * 2 - 2)
        : slideWidth * 0.1 - (spaceBetween * 2 - 2);
    setButtonWidth(width / 2);
  };
  // eslint-disable-next-line no-unused-vars
  let swiperInstance = null;

  return (
    <>
      <h1 className="pl-10 pt-10 text-xl">{title}</h1>
      <div
        className="mt-10 relative
                    h-[25vh] lg:h-[20vh] xl:h-[40vh]"
      >
        <button
          className={`custom-prev-${index} transform text-white bg-black opacity-70 z-20 rounded-tr-md rounded-br-md absolute left-0 top-0 flex justify-center items-center h-full`}
          style={{ width: `${buttonWidth}px` }}
        >
          <ChevronLeft size={24} />
        </button>

        <Swiper
          slidesPerView={3.6}
            // sm	640px	
            // md	768px	
            // lg	1024px	
            // xl	1280px	
            // 2xl	1536px
          breakpoints={{
            768: { slidesPerView: 5.6 }, // md
            1536: { slidesPerView: 7.6 }, // xl
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
          {movies.map((movie, idx) => (
            <SwiperSlide
              key={movie.id}
              className="h-full w-full absolute left-0 top-0 z-10 "
              onMouseEnter={() => {
                setHoveredIndex(idx);
                overlayIdxRef.current = idx;
                overlayTimeout.current = setTimeout(() => {
                  setShowOverlay(true);
                }, 700);
              }}
              onMouseLeave={() => {
                overlayIdxRef.current = null;
                clearTimeout(overlayTimeout.current);
              }}
            >
              <div
                className="relative h-full w-full"
                ref={(el) => (slideRefs.current[idx] = el)}
              >
                <MovieCard movie={movie} />
              </div>
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
      {showOverlay && hoveredIndex !== null && overlayStyle && (
        <div
          style={overlayStyle}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setShowOverlay(false);
            setOverlayStyle(null);
          }}
        />
      )}
    </>
  );
};

export default MovieSection;
