import WatchedItem from "./WatchedItem";

const WatchedItems = ({ watches, onRemoveWatchedMovie }) => {
  return (
    <ul className="watches">
      {watches.map((watched) => (
        <WatchedItem
          key={watched.imdbID}
          watched={watched}
          onRemoveWatchedMovie={onRemoveWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedItems;
