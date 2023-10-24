import { useEffect } from "react";
import { useGetAllArtistesQuery } from "../../app/apiSlice";
import ArtisteCard from "./ArtisteCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
import { motion } from "framer-motion";

const ArtistesPage = () => {
  const {
    data: artistes,
    isLoading,
    isError,
    error,
  } = useGetAllArtistesQuery();

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
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Artistes</h1>
      </div>
      <p className="mb-8 text-gray-200">
        Connect with your favorite artistes and stay up-to-date with their
        latest releases
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4"
      >
        {artistes.map((artiste) => (
          <ArtisteCard key={artiste._id} artiste={artiste} />
        ))}
      </motion.div>
    </section>
  );
};

export default ArtistesPage;
