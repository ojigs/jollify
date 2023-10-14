import { useEffect } from "react";
import { useGetAllAlbumsQuery } from "../../app/apiSlice";
import AlbumCard from "./AlbumCard";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";

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
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold mb-2">Albums</h1>
      </div>
      <p className="mb-8 text-gray-200">
        Indulge your passion for music with our handpicked selection of albums
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </section>
  );
};

export default AlbumsPage;
