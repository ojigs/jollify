import { useEffect } from "react";
import { useGetSongDetailsQuery } from "../../app/apiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

const SongPage = () => {
  const { id } = useParams();
  const { data: song, isLoading, isError, error } = useGetSongDetailsQuery(id);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  // const songs = {
  //   _id: 23453,
  //   artiste: "Ruger",
  //   title: "Blue",
  //   likes: [{}, {}],
  //   lyrics: `<p>This is the first line of lyrics</p>
  // <p>This is the second line of lyrics</p>`,
  //   comments: [
  //     { text: "Nice song Ruger", user: { name: "User1" } },
  //     { text: "I've had Blue on repeat all day", user: { name: "User2" } },
  //   ],
  // };
  return (
    <section className=" text-gray-200">
      <SongDetail song={song} />

      <Lyrics lyrics={song.lyrics} />
      <CommentsSection comments={song.comments} />
    </section>
  );
};

export default SongPage;
