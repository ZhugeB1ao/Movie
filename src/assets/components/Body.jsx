const Body = ({ movies }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-8 bg-[#141414]">
            {movies.slice(1).map((movie) => (
                <div key={movie.id} className="p-4">
                    {/*<img*/}
                    {/*    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}*/}
                    {/*    alt={movie.title}*/}
                    {/*    className="rounded-lg"*/}
                    {/*/>*/}

                    <div
                        className="w-full h-48 bg-cover bg-center rounded-lg relative "
                        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`}}
                    >
                        <h3 className="text-white m-2 text-lg font-semibold absolute">{movie.title}</h3>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Body;
