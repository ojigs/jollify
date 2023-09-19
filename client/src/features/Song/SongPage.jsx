import SongDetail from "./SongDetail";
// import { useParams } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
// import Lyrics from "./Lyrics";
// import CommentsSection from "./CommentsSection";

const SongPage = () => {
  // const { id } = useParams();
  const songs = { _id: 23453, artiste: "Ruger", title: "Blue" };
  return (
    <section className=" text-gray-200">
      <SongDetail song={songs} />
      <LikeButton />
      {/* <Lyrics song={songData} /> */}
      {/* <CommentsSection song={songData} /> */}
    </section>
  );
};

export default SongPage;
