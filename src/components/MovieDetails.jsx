import { useState, useEffect } from "react";

import Loader from "./UI/Loader";
import Error from "./UI/Error";
import StarRating from "./StarRating";

const key = "d767860c";

const MovieDetails = ({ selectedId, onClose, onAddWatch, watches }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const isWatched = watches
    .map((watched) => watched.imdbID)
    .includes(selectedId);

  const watchedUserRating = watches.find(
    (watched) => watched.imdbID === selectedId
  )?.userRating;

  const {
    Poster,
    Released,
    Runtime,
    Title,
    imdbRating,
    Genre,
    Plot,
    Actors,
    Director,
    imdbID,
    Year,
  } = movie;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        if (!res.ok) {
          throw new Error("fetched failed");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("something went wrong while fetching movie");
        }
        setMovie(data);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie | ${Title}`;

    // we need a cleanup function to clear the title of the app when the component unmouted
    return function () {
      document.title = "usePopcorn";
    };
  }, [Title]);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onClose]);

  const addHandler = () => {
    onAddWatch({
      imdbID,
      Title,
      Year,
      Poster,
      runtime: Number(Runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    });
  };

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && error && <Error message={error} />}
      {!isLoading && !error && (
        <>
          <div className="header">
            <button className="btn-back" onClick={() => onClose()}>
              &larr;
            </button>
            <img src={Poster} alt={`img of movie ${movie} `} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </div>
          <section>
            <div className="ratings">
              {isWatched ? (
                <p> you rated this movie with {watchedUserRating}</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addHandler}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="details--info">
              <p>{Plot}</p>
              <p>{Actors}</p>
              <p>Directed by {Director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
