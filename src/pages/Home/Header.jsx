const Header = ( featuredMovie ) => {
  if (!featuredMovie)
    return <p className="text-center text-xl">No movie data available</p>;

  const { backdrop_path, title, adult, release_date, genres, overview } = movie;

  return (
    <header
      className="flex justify-start items-center text-white  relative flex-row 
                    px-12 md:px-16 lg:px-20
                    mt-12 md:mt-16 lg:mt-20
                    h-[50vh] lg:h-[75vh]"
      style={{
        background: `url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}) top/cover no-repeat`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414] h-full"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#141414] h-full"></div>

      <div
        className="relative z-10 flex flex-col text-left
                max-w-md md:max-w-lg lg:max-w-xl"
      >
        <h1
          className="font-bold
                    text-2xl md:text-4xl lg:text-5xl"
        >
          {title || "Unknown Title"}
        </h1>
        <ul
          className="flex flex-wrap justify-start
                    my-4 "
        >
          <li className="border px-2 py-1 rounded">{featuredMovie.adult ? "18+" : "13+"}</li>
          <li className="px-2 py-[5px]">
            {featuredMovie.release_date ? featuredMovie.release_date.split("-")[0] : "N/A year"}
          </li>
          <li className="py-[5px]">
            {featuredMovie.genres?.length > 0 ? featuredMovie.genres.join(", ") : "N/A genre"}
          </li>
        </ul>
        <p className="text-sm md:text-base lg:text-lg">
          {featuredMovie.overview || "No description available"}
        </p>
        <button
          className=" border-2 rounded-3xl mx-0
                    my-5 md:my-8 lg:my-10
                    
                    p-2 md:p-4 lg:p-5
                    text-base md:text-xl lg:text-2xl"
        >
          Watch now
        </button>
      </div>
    </header>
  );
};

export default Header;
