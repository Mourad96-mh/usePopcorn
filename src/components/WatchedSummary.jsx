const WatchedSummary = ({
  avrgimdbRating,
  avrguserRating,
  avrgRuntime,
  watches,
}) => {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <span>#️⃣ {watches.length} movies</span>
      <span>⭐ {avrgimdbRating.toFixed(2)}</span>
      <span>🌟 {avrguserRating.toFixed(2)}</span>
      <span>⏳ {avrgRuntime} min</span>
    </div>
  );
};

export default WatchedSummary;
