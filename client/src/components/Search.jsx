import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchResultsSelector, searchSongs } from "./searchSlice";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const [query, setQuery] = useState("");
  // const dispatch = useDispatch();
  // const searchResults = useSelector(searchResultsSelector);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // setQuery(newQuery);
    // dispatch(searchSongs(newQuery));
  };

  return (
    <div className="mb-8">
      <div className="relative w-3/4 m-auto text-gray-100">
        <input
          className="w-full pl-10 pr-4 py-2 bg-transparent rounded-full border border-gray-600 shadow-sm focus:outline-none focus:border-gray-500"
          type="text"
          placeholder="Find songs on Jollify..."
          value={query}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BsSearch className="text-gray-400" />
        </div>
      </div>

      {/* {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Search Results:</h2>
          <ul className="list-disc ml-6">
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Search;
