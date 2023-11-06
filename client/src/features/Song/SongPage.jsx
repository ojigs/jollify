import { useGetSongDetailsQuery } from "./songApiSlice";
import { useParams } from "react-router-dom";
import SongDetail from "./SongDetail";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { formatDate } from "../../utils";
import { Helmet } from "react-helmet-async";

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
          <Helmet prioritizeSeoTags>
            <title>{`${song.artiste.name} - ${song.title} MP3 Stream on Jollify`}</title>
            <link
              rel="canonical"
              href={`https://jollify.vercel.app/songs/${song._id}`}
            />
            <meta
              name="description"
              content={`Stream ${song.title} by ${
                song.artiste.name
              } on Jollify and enjoy other amazing music collections. Released ${formatDate(
                song.releaseDate
              )}`}
            />
            <meta
              property="og:title"
              content={`${song.artiste.name} - ${song.title} MP3 Stream on Jollify`}
            />
            <meta
              property="og:description"
              content={`Stream ${song.title} by ${
                song.artiste.name
              } on Jollify and enjoy other amazing music collections. Released ${formatDate(
                song.releaseDate
              )}`}
            />
            <meta property="og:image" content={song.coverImage || ""} />
            <meta
              property="og:url"
              content={`https://jollify-server.vercel.app/songs/${song._id}`}
            />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:title"
              content={`${song.artiste.name} - ${song.title} MP3 Stream on Jollify`}
            />
            <meta
              name="twitter:description"
              content={`Stream ${song.title} by ${
                song.artiste.name
              } on Jollify and enjoy other amazing music collections. Released ${formatDate(
                song.releaseDate
              )}`}
            />
            <meta name="twitter:image" content={song.coverImage || ""} />
          </Helmet>
          <SongDetail song={song} />
          <Lyrics lyrics={song.lyrics} />
          <CommentsSection comments={song.comments} songId={song._id} />
        </section>
      )}
    </>
  );
};

export default SongPage;
