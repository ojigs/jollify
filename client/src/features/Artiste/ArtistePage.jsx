// import { useState, useEffect } from "react";
import ResourceDetail from "../../components/ResourceDetail";
import SongList from "../../components/SongList";
// import HomeFront from "../Home/HomeFront";

const ArtistePage = () => {
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
  const artiste = {
    _id: 23453,
    name: "Ruger",
    bio: "Ruger is a Nigerian Affrobeats artiste",
    likes: [{}, {}],
  };
  const songs = [
    {
      _id: 23453,
      artiste: { _id: 23453, name: "Burna Boy" },
      title: "Peru",
      album: { _id: 23453, title: "Ru da World" },
      duration: "3:29",
    },
    {
      _id: 23454,
      artiste: { _id: 23454, name: "Fireboy" },
      title: "Airplane mode",
      album: { _id: 23454, title: "Ru da World" },
      duration: "3:29",
    },
    {
      _id: 23455,
      artiste: { _id: 23455, name: "Ruger" },
      title: "Blue",
      album: { _id: 23455, title: "Ru da World" },
      duration: "3:29",
      isPlaying: true,
    },
    {
      _id: 23456,
      artiste: { _id: 23456, name: "Ruger" },
      title: "Blue",
      album: { _id: 23456, title: "Ru da World" },
      duration: "3:29",
    },
    {
      _id: 23457,
      artiste: { _id: 23457, name: "Ruger" },
      title: "Blue",
      album: { _id: 23457, title: "Ru da World" },
      duration: "3:29",
    },
    {
      _id: 23458,
      artiste: { _id: 23458, name: "Ruger" },
      title: "Blue",
      album: { _id: 23458, title: "Ru da World" },
      duration: "3:29",
    },
    {
      _id: 23459,
      artiste: { _id: 23459, name: "Ruger" },
      title: "Blue",
      album: { _id: 23459, title: "Ru da World" },
      duration: "3:29",
    },
  ];

  return (
    <section className=" text-gray-200">
      <ResourceDetail resource={artiste} resourceType={"artiste"} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <SongList songs={songs} listType={"artiste"} />
      </section>
      {/* <HomeFront songs={songs} highlightedSong={highlightedSong} /> */}
    </section>
  );
};

export default ArtistePage;
