const WatchedItem = ({ watched, onRemoveWatchedMovie }) => {
  const { Poster, Title, runtime, imdbRating, userRating } = watched;

  return (
    <li className="watched">
      <img src={Poster} alt="watched img" />
      <div className="watched--info">
        <h3>{Title}</h3>
        <span>⭐ {imdbRating}</span>
        <span>🌟 {userRating}</span>
        <span>⏳ {runtime} min</span>
      </div>
      <button
        className="btn-delete"
        onClick={() => onRemoveWatchedMovie(watched.imdbID)}
      >
        x
      </button>
    </li>
  );
};

export default WatchedItem;
