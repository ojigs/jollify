import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";

const AlbumPage = () => {
  const album = {
    _id: 23453,
    artiste: { name: "Ruger" },
    title: "Ru da World",
    likes: [{}, {}],
    songs: [
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
    ],
    duration: "3:29",
    lyrics: `<p>This is the first line of lyrics</p>
      <p>This is the second line of lyrics</p>`,
    comments: [
      { text: "Nice song Ruger", user: { name: "User1" } },
      { text: "I've had Blue on repeat all day", user: { name: "User2" } },
    ],
  };
  return (
    <section className=" text-gray-200">
      <ResourceDetail resource={album} resourceType={"album"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={album.songs} listType={"album"} />
      </section>
    </section>
  );
};

export default AlbumPage;
