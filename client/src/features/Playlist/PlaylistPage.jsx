import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";

const PlaylistPage = () => {
  const playlist = {
    _id: 23453,
    createdBy: { _id: 23453, username: "Jollify" },
    title: "Party Time",
    likes: [{}, {}],
    songs: [
      { _id: 23453, artiste: "Ruger", title: "Blue", duration: "3:29" },
      { _id: 23454, artiste: "Ruger", title: "Blue", duration: "3:29" },
      {
        _id: 23455,
        artiste: { _id: 23453, name: "Ruger" },
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
      <ResourceDetail resource={playlist} resourceType={"playlist"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={playlist.songs} listType={"playlist"} />
      </section>
    </section>
  );
};

export default PlaylistPage;
