import WatchedItems from "./WatchedItems";
import WatchedSummary from "./WatchedSummary";

const WatchedList = ({
  watches,
  avrguserRating,
  avrgimdbRating,
  avrgRuntime,
  onRemoveWatchedMovie,
}) => {
  return (
    <>
      <WatchedSummary
        avrgRuntime={avrgRuntime}
        avrguserRating={avrguserRating}
        avrgimdbRating={avrgimdbRating}
        watches={watches}
      />
      <WatchedItems
        watches={watches}
        onRemoveWatchedMovie={onRemoveWatchedMovie}
      />
    </>
  );
};

export default WatchedList;
