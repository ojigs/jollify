import { useEffect } from "react";
import { useGetAllAlbumsQuery } from "./albumApiSlice";
import AlbumCard from "./AlbumCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const AlbumsPage = () => {
  const { data: albums, isLoading, isError, error } = useGetAllAlbumsQuery();

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
    <section className="text-gray-100">
      <Helmet prioritizeSeoTags>
        <title>{`Albums - Jollify`}</title>
        <link rel="canonical" href={`https://jollify.vercel.app/albums`} />
        <meta
          name="description"
          content={`Indulge your passion for music with our handpicked selection of albums`}
        />
        <meta property="og:title" content="Albums - Jollify" />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/albums`}
        />
        <meta
          property="og:description"
          content={`Indulge your passion for music with our handpicked selection of albums`}
        />
        <meta name="twitter:title" content="Albums - Jollify" />
        <meta
          name="twitter:description"
          content="Indulge your passion for music with our handpicked selection of albums"
        />
      </Helmet>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Albums</h1>
      </div>
      <p className="mb-8 text-gray-200">
        Indulge your passion for music with our handpicked selection of albums
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </motion.div>
    </section>
  );
};

export default AlbumsPage;
