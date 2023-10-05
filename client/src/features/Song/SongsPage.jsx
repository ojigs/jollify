import { useEffect } from "react";
import { useGetAllSongsQuery } from "../../app/apiSlice";
import SongCard from "./SongCard";

const SongsPage = () => {
  const { data: songs, isLoading, isError, error } = useGetAllSongsQuery();

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>An error has occured</h1>;
  }

  return (
    <section className="text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-2">Explore</h1>
      <p className="mb-8 text-gray-200">
        Browse amazing collection of songs on Jollify
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default SongsPage;
