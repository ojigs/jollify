import { useState } from "react";
import { useSelector } from "react-redux";
import FavoriteSongs from "./FavoriteSongs";
import FavoriteAlbums from "./FavoriteAlbums";
import FavoritePlaylists from "./FavoritePlaylists";

const FavoritesPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const { favoriteSongs, favoriteAlbums, favoritePlaylists } = user;
  const [selectedTab, setSelectedTab] = useState("songs");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <section className="container text-gray-100 h-full">
      <h1 className="text-xl md:text-3xl font-semibold mb-4">Favorites</h1>

      <nav className="flex justify-start gap-4 mb-4">
        <button
          className={`text-lg font-semibold px-4 py-2 rounded ${
            selectedTab === "songs"
              ? `bg-${selectedTheme} text-gray-100`
              : `bg-gray-100 text-${selectedTheme}`
          }`}
          onClick={() => handleTabClick("songs")}
        >
          Songs
        </button>
        <button
          className={`text-lg font-semibold px-4 py-2 rounded ${
            selectedTab === "albums"
              ? `bg-${selectedTheme} text-gray-100`
              : `bg-gray-100 text-${selectedTheme}`
          }`}
          onClick={() => handleTabClick("albums")}
        >
          Albums
        </button>
        <button
          className={`text-lg font-semibold px-4 py-2 rounded ${
            selectedTab === "playlists"
              ? `bg-${selectedTheme} text-gray-100`
              : `bg-gray-100 text-${selectedTheme}`
          }`}
          onClick={() => handleTabClick("playlists")}
        >
          Playlists
        </button>
      </nav>

      {selectedTab === "songs" && <FavoriteSongs songs={favoriteSongs} />}
      {selectedTab === "albums" && <FavoriteAlbums albums={favoriteAlbums} />}
      {selectedTab === "playlists" && (
        <FavoritePlaylists playlists={favoritePlaylists} />
      )}
    </section>
  );
};

export default FavoritesPage;
