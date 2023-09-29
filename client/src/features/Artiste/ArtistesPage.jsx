import ArtisteCard from "./ArtisteCard";

const ArtistesPage = () => {
  const artistes = [
    {
      _id: 23453,
      name: "Ruger",
      title: "Ru da World",
      description: "Afro Beats",
    },
    {
      _id: 23454,
      name: "Ruger",
      title: "Ru da World",
      description: "Afro Beats",
    },
  ];

  return (
    <section className="text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Artistes</h1>
      </div>
      <p className="mb-8 text-gray-200">
        Connect with your favorite artistes and stay up-to-date with their
        latest releases
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artistes.map((artiste) => (
          <ArtisteCard key={artiste._id} artiste={artiste} />
        ))}
      </div>
    </section>
  );
};

export default ArtistesPage;
