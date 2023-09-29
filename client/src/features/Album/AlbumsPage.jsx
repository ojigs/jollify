import AlbumCard from "./AlbumCard";

const AlbumsPage = () => {
  const albums = [
    {
      _id: 23453,
      artiste: { _id: 23453, name: "Ruger" },
      title: "Ru da World",
      description: "Afro Beats",
    },
  ];

  return (
    <section className="text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Albums</h1>
      </div>
      <p className="mb-8 text-gray-200">
        Indulge your passion for music with our handpicked selection of albums
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default AlbumsPage;
