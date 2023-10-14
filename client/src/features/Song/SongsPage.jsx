import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetAllSongsQuery } from "../../app/apiSlice";
import SongCard from "./SongCard";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

const SongsPage = () => {
  const [searchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page");
  const {
    data: { songs, total } = {},
    isLoading,
    isError,
    error,
  } = useGetAllSongsQuery({ page: page ?? 1, limit: 5 });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.search]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorMsg error={error} />;
  }

  return (
    <section className="text-gray-100">
      <h1 className="text-xl md:text-3xl font-semibold mb-2">Explore</h1>
      <p className="mb-8 text-gray-200">
        Browse amazing collection of songs on Jollify
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Pagination
          currentPage={Number(page || 1)}
          totalPages={Math.ceil(total / 5)}
        />
      </div>
    </section>
  );
};

export default SongsPage;
