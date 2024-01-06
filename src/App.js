import { useEffect } from "react";

import Header from "./components/UI/Header";
import MoviesList from "./components/MoviesList";
import WatchedList from "./components/WatchedList";
import { useState } from "react";
import Box from "./components/Box";
import Loader from "./components/UI/Loader";
import Error from "./components/UI/Error";
import MovieDetails from "./components/MovieDetails";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "d767860c";

function App() {
  const [movies, setMovies] = useState([]);
  const [watches, setWatches] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const moviesLength = movies.length;
  const avrgImdbRating = average(watches.map((watched) => watched.imdbRating));
  const avrgUserRating = average(watches.map((watched) => watched.userRating));
  const avrgRuntime = average(watches.map((watched) => watched.runtime));

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Error occured while fetching movie");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("movie could not found");
        }
        setMovies(data.Search);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  const selectIdHandler = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const closeHandler = () => {
    setSelectedId(null);
  };

  const watchHandler = (movie) => {
    // console.log(movie);
    setWatches((prev) => [...prev, movie]);
    closeHandler();
  };

  const removeWatchedHandler = (id) => {
    setWatches((watches) => watches.filter((watched) => watched.imdbID !== id));
  };

  return (
    <div className="app">
      <Header length={moviesLength} setQuery={setQuery} query={query} />
      <main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && error && <Error message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectId={selectIdHandler} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClose={closeHandler}
              onAddWatch={watchHandler}
              watches={watches}
            />
          ) : (
            <WatchedList
              watches={watches}
              avrgimdbRating={avrgImdbRating}
              avrguserRating={avrgUserRating}
              avrgRuntime={avrgRuntime}
              onRemoveWatchedMovie={removeWatchedHandler}
            />
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
