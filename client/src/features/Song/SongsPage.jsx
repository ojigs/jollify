import SongCard from "./SongCard";

const SongsPage = () => {
  const songs = [
    { _id: 23453, artiste: { _id: 23453, name: "Ruger" }, title: "Blue" },
    { _id: 23454, artiste: { _id: 23454, name: "Ruger" }, title: "Blue" },
    { _id: 23455, artiste: { _id: 23455, name: "Ruger" }, title: "Blue" },
    { _id: 23456, artiste: { _id: 23456, name: "Ruger" }, title: "Blue" },
    { _id: 23457, artiste: { _id: 23457, name: "Ruger" }, title: "Blue" },
    { _id: 23458, artiste: { _id: 23458, name: "Ruger" }, title: "Blue" },
    { _id: 23459, artiste: { _id: 23459, name: "Ruger" }, title: "Blue" },
  ];

  return (
    <section className="container text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-2">Explore</h1>
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
