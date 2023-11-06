import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAlbumDetailsQuery } from "./albumApiSlice";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import { Helmet } from "react-helmet-async";
import { formatDate } from "../../utils";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";

const AlbumPage = () => {
  const { id } = useParams();
  const {
    data: album,
    isLoading,
    isError,
    error,
  } = useGetAlbumDetailsQuery(id);

  useEffect(() => {
    if (isError) {
      console.error(error);
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
      <Helmet prioritizeSeoTags>
        <title>{`${album.artiste.name} - ${album.title} MP3 Stream on Jollify`}</title>
        <link
          rel="canonical"
          href={`https://jollify.vercel.app/albums/${album._id}`}
        />
        <meta
          name="description"
          content={`Stream ${album.title} by ${
            album.artiste.name
          } on Jollify and enjoy other amazing music collections. Released ${formatDate(
            album.releaseDate
          )}`}
        />
        <meta
          property="og:title"
          content={`${album.artiste.name} - ${album.title} MP3 Stream on Jollify`}
        />
        <meta
          property="og:description"
          content={`Stream ${album.title} by ${
            album.artiste.name
          } on Jollify and enjoy other amazing music collections. Released ${formatDate(
            album.releaseDate
          )}`}
        />
        <meta property="og:image" content={album.coverImage || ""} />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/albums/${album._id}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${album.artiste.name} - ${album.title} MP3 Stream on Jollify`}
        />
        <meta
          name="twitter:description"
          content={`Stream ${album.title} by ${
            album.artiste.name
          } on Jollify and enjoy other amazing music collections. Released ${formatDate(
            album.releaseDate
          )}`}
        />
        <meta name="twitter:image" content={album.coverImage || ""} />
      </Helmet>
      <ResourceDetail resource={album} resourceType={"album"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={album.songs} listType={"album"} />
      </section>
      <AddToPlaylistModal />
      <CreatePlaylistModal />
    </section>
  );
};

export default AlbumPage;
