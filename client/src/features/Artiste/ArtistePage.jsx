import { useEffect } from "react";
import { useGetArtisteDetailsQuery } from "./artisteApiSlice";
import { useParams } from "react-router-dom";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import { Helmet } from "react-helmet-async";
import CreatePlaylistModal from "../Studio/MyPlaylists/CreatePlaylistModal";

const ArtistePage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetArtisteDetailsQuery(id);

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
        <title>{`${data.artiste.name} songs Mp3. New Songs and Albums - Stream on Jollify`}</title>
        <link
          rel="canonical"
          href={`https://jollify.vercel.app/artistes/${data.artiste._id}`}
        />
        <meta
          name="description"
          content={`Stream ${data.artiste.name}'s latest songs and albums on Jollify and enjoy other amazing music collections.`}
        />
        <meta
          property="og:title"
          content={`${data.artiste.name} songs Mp3. New Songs and Albums - Stream on Jollify`}
        />
        <meta
          property="og:description"
          content={`Stream ${data.artiste.name}'s latest songs and albums on Jollify and enjoy other amazing music collections.`}
        />
        <meta property="og:image" content={data.artiste.image || ""} />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/artistes/${data.artiste._id}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${data.artiste.name} songs Mp3. New Songs and Albums - Stream on Jollify`}
        />
        <meta
          name="twitter:description"
          content={`Stream ${data.artiste.name}'s latest songs and albums on Jollify and enjoy other amazing music collections.`}
        />
        <meta name="twitter:image" content={data.artiste.image || ""} />
      </Helmet>
      <ResourceDetail resource={data.artiste} resourceType={"artiste"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={data.songs} listType={"artiste"} />
      </section>
      <AddToPlaylistModal />
      <CreatePlaylistModal />
    </section>
  );
};

export default ArtistePage;
