import { useEffect } from "react";
import { useGetSongDetailsQuery } from "../../app/apiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";

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

  return (
    <section className=" text-gray-200">
      <SongDetail song={song} />
      <Lyrics lyrics={song.lyrics} />
      <CommentsSection comments={song.comments} />
      <AddToPlaylistModal songId={song._id} />
    </section>
  );
};

export default SongPage;
