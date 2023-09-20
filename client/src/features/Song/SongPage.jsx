import SongDetail from "./SongDetail";
// import { useParams } from "react-router-dom";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";

const SongPage = () => {
  // const { id } = useParams();
  const songs = {
    _id: 23453,
    artiste: "Ruger",
    title: "Blue",
    likes: [{}, {}],
    lyrics: `<p>This is the first line of lyrics</p>
  <p>This is the second line of lyrics</p>`,
    comments: [
      { text: "Nice song Ruger", user: { name: "User1" } },
      { text: "I've had Blue on repeat all day", user: { name: "User2" } },
    ],
  };
  return (
    <section className=" text-gray-200">
      <SongDetail song={songs} />

      <Lyrics lyrics={songs.lyrics} />
      <CommentsSection comments={songs.comments} />
    </section>
  );
};

export default SongPage;
