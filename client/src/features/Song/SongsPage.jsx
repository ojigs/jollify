import SongCard from "./SongCard";

const SongsPage = () => {
  const songs = [{}];

  return (
    <section className="container text-gray-100">
      <h1 className="text-3xl font-semibold mb-2">Explore</h1>
      <p className="mb-8 text-gray-200">
        Browse amazing collection of songs on Jollify
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default SongsPage;
