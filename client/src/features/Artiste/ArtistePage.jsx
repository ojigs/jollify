import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";

const ArtistePage = () => {
  const artiste = {
    _id: 23453,
    name: "Ruger",
    bio: "Ruger is a Nigerian Affrobeats artiste",
    likes: [{}, {}],
  };
  const songs = [
    { _id: 23453, artiste: "Ruger", title: "Blue", duration: "3:29" },
    { _id: 23454, artiste: "Ruger", title: "Blue", duration: "3:29" },
    {
      _id: 23455,
      artiste: { name: "Ruger" },
      title: "Blue",
      duration: "3:29",
      isPlaying: true,
    },
    { _id: 23456, artiste: "Ruger", title: "Blue", duration: "3:29" },
    { _id: 23457, artiste: "Ruger", title: "Blue", duration: "3:29" },
    { _id: 23458, artiste: "Ruger", title: "Blue", duration: "3:29" },
    { _id: 23459, artiste: "Ruger", title: "Blue", duration: "3:29" },
  ];

  return (
    <section className=" text-gray-200">
      <ResourceDetail resource={artiste} resourceType={"artiste"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={songs} listType={"artiste"} />
      </section>
    </section>
  );
};

export default ArtistePage;
