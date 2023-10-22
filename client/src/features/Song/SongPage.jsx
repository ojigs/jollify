import { useGetSongDetailsQuery } from "../../app/apiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import LoginModal from "../../components/LoginModal";

const SongPage = () => {
  const { id } = useParams();
  const {
    data: song,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSongDetailsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <>
      {isSuccess && (
        <section className=" text-gray-200">
          <SongDetail song={song} />
          <Lyrics lyrics={song.lyrics} />
          <CommentsSection comments={song.comments} songId={song._id} />
          <AddToPlaylistModal />
          <LoginModal />
        </section>
      )}
    </>
  );
};

export default SongPage;
