const MovieItem = ({ movie, onSelectId }) => {
  const { Title, Poster, Year } = movie;

  const clickHandler = () => {
    onSelectId(movie.imdbID);
  };

  return (
    <li className="movie" onClick={clickHandler}>
      <img src={Poster} alt="movie img" />
      <div className="movie--info">
        <h2>{Title}</h2>
        <span>📆 {Year}</span>
      </div>
    </li>
  );
};

export default MovieItem;
