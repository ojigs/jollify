import { FaPlus } from "react-icons/fa";
import PlaylistCard from "./PlaylistCard";

const PlaylistsPage = () => {
  const playlists = [
    {
      _id: 23453,
      createdBy: "Ruger",
      title: "Blue",
      description: "Afro Beats",
    },
  ];

  const handleCreatePlaylist = () => {
    //handle create playlist logic here
  };

  return (
    <section className="container text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Playlists</h1>
        <button
          className="bg-accent flex justify-center items-center mb-2 hover:bg-accent-50 active:bg-opacity-90 py-2 px-4 rounded-lg"
          onClick={handleCreatePlaylist}
        >
          <FaPlus className="text-xs mr-2" />
          <span>Create Playlist</span>
        </button>
      </div>
      <p className="mb-8 text-gray-200">
        Unleash your musical journey from our collection of playlists
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </section>
  );
};

export default PlaylistsPage;
