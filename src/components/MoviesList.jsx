import MovieItem from "./MovieItem";

const MoviesList = ({ movies, onSelectId }) => {
  return (
    <ul className="movies-list">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.imdbID} onSelectId={onSelectId} />
      ))}
    </ul>
  );
};

export default MoviesList;
