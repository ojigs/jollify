import { useEffect } from "react";
import { useGetArtisteDetailsQuery } from "../../app/apiSlice";
import { useParams } from "react-router-dom";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
import Loading from "../../components/Loading";
import ErrorMsg from "../../components/ErrorMsg";
// import HomeFront from "../Home/HomeFront";

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

  // const [highlightedSong, setHighlightedSong] = useState(0);
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowDown") {
  //       // Scroll to the next song row
  //       setHighlightedSong((prevSong) => prevSong + 1, { behavior: "smooth" });
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <section className=" text-gray-200">
      <ResourceDetail resource={data.artiste} resourceType={"artiste"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={data.songs} listType={"artiste"} />
      </section>
      {/* <HomeFront songs={songs} highlightedSong={highlightedSong} /> */}
    </section>
  );
};

export default ArtistePage;
