const Header = ({movie}) => {
    if (!movie) return <p className="text-center text-xl">No movie data available</p>;

    return (
        <header
            className="flex justify-start items-center px-28 py-40 m-0 text-white h-[90vh] w-full relative"
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`}}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414] h-full "></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#141414] h-full "></div>

            <div className="max-w-2xl relative z-10">
                <h1 className="text-center text-7xl font-bold">{movie?.title || "Unknown Title"}</h1>
                <ul className="flex justify-center space-x-4 my-5">
                    <li className="border px-2 py-1 rounded">{movie?.adult ? "18+" : "13+"}</li>
                    <li className="px-2 py-[5px]">{movie?.release_date ? movie.release_date.split("-")[0] : "N/A"}</li>
                    <li className="px-2 py-[5px]">{movie?.genres?.length > 0 ? movie.genres.join(", ") : "N/A"}</li>
                    <li className="px-2 py-[5px]">
                        {typeof movie?.runtime === "number"
                            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                            : "N/A"
                        }
                    </li>
                </ul>
                <p className="text-left text-xl mt-4">{movie?.overview || "No description available"}</p>
            </div>
        </header>
    );
};

export default Header;
