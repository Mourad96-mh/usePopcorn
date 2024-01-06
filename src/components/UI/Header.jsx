import { useState } from "react";

const Header = ({ length, query, setQuery }) => {
  return (
    <header>
      <h1>🍿 usePopcorn</h1>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search movies..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <span>
        Found <strong>{length}</strong> results
      </span>
    </header>
  );
};

export default Header;
