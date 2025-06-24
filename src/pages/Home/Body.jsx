import MovieSection from "../../components/shared/MovieSection";

const Body = (moviesData) => {
// Destructure the moviesData object to get trendingMovies and other categories
// {  trendingMovies: [], 
//    nowPlayingMovies: [],   
//    popularMovies: [], 
//    topRatedMovies: [], 
//    upcomingMovies: [], 
//    airingTodayTVShows: [], 
//    onTheAirTVShows: [], 
//    popularTVShows: [], 
//    topRatedTVShows: [] 
// }
  return (
    <div className="bg-[#141414] text-white w-[100vw] ">
      {Object.entries(moviesData).map(([category, movies], index) => (
        // Object.entries returns an array of key-value pairs, where key is the category name and value is the movies array
        // [
        //    ["trendingMovies", [...]], 
        //    ["nowPlayingMovies", [...]], 
        // ...]
        <MovieSection
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
