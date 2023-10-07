import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTopSongsQuery } from "../../app/apiSlice";
import { FaHeart, FaRegHeart, FaClock } from "react-icons/fa";

const HomeFront = () => {
  const { data: songs } = useGetTopSongsQuery(5);
  console.log(songs);
  // const songRefs = songs.map(() => useRef());
  const [likedSongs, setLikedSongs] = useState([]);
  // const [highlightedSong, setHighlightedSong] = useState(0);

  // const songRefs = useRef([]);

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowDown") {
  //       // Scroll to the next song row
  //       setHighlightedSong((prevSong) => prevSong + 1);
  //     }
  //   };

  //   const handleKeyUp = (event) => {
  //     if (event.key === "ArrowUp") {
  //       // Scroll to the previous song row
  //       setHighlightedSong((prevSong) => prevSong - 1);
  //     }
  //   };

  //   const refs = songRefs?.current;

  //   refs.forEach((row) => {
  //     row.addEventListener("keydown", handleKeyDown);
  //     row.addEventListener("keyup", handleKeyUp);
  //   });

  //   return () => {
  //     refs.forEach((row) => {
  //       row.removeEventListener("keydown", handleKeyDown);
  //       row.removeEventListener("keyup", handleKeyUp);
  //     });
  //   };
  // }, []);

  // useEffect(() => {
  //   // Remove the highlight from all song rows
  //   songRefs.current.forEach((row) => {
  //     row.style.backgroundColor = "";
  //   });

  //   // Highlight the song row at the specified index
  //   if (songRefs.current[highlightedSong]) {
  //     songRefs.current[highlightedSong].style.backgroundColor = "#0d0d0d";
  //   }
  // }, [highlightedSong]);

  const handleLikeClick = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const isSongLiked = (songId) => likedSongs.includes(songId);
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <section className="relative mt-8 text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">Billboard Top 50</h2>
        <Link
          to={`/songs}`}
          className={`text-base text-${selectedTheme} hover:text-${selectedTheme}-50 active:text-opacity-75 font-bold`}
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
        <div className="col-span-1 text-center font-semibold"></div>
        <div className="col-span-1 md:col-span-1 font-semibold"></div>
        <div className="col-span-3 md:col-span-4 font-semibold">
          <div>Title</div>
        </div>
        <div className="hidden md:block col-span-3 font-semibold">
          <div>Album</div>
        </div>
        <div className="hidden md:block col-span-2 font-semibold">
          <div>
            <FaClock />
          </div>
        </div>
        <div className="col-span-1 md:col-span-1 text-center font-semibold">
          <div></div>
        </div>
      </div>
      <div className="">
        {songs &&
          songs.map((song, index) => (
            <article
              // ref={(el) => (songRefs.current[index] = el)}
              className={`grid grid-cols-6 md:grid-cols-12 gap-4 items-center bg-opacity-50 p-1`}
              key={song._id}
            >
              <div className="col-span-1 md:col-span-1 text-center">
                <div>{index + 1}</div>
              </div>
              <div className="col-span-1 md:col-span-1">
                <div>
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-full h-full rounded-md"
                  />
                </div>
              </div>
              <div className="col-span-3 md:col-span-4 flex flex-col">
                <Link
                  to={`/songs/${song._id}`}
                  className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                >
                  {song.title}
                </Link>
                <Link
                  to={`/artistes/${song.artiste._id}`}
                  className={`text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                >
                  {song.artiste.name}
                </Link>
              </div>
              <div className="hidden md:block col-span-3">
                <Link
                  to={`/albums/${song.album?._id}`}
                  className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                >
                  {song.album?.title}
                </Link>
              </div>
              <div className="hidden md:block col-span-2">
                <div>{song.duration}</div>
              </div>
              <div className="col-span-1 md:col-span-1 text-center">
                <button onClick={() => handleLikeClick(song._id)}>
                  {isSongLiked(song._id) ? (
                    <FaHeart className="text-red-500 text-base md:text-xl" />
                  ) : (
                    <FaRegHeart className="text-base md:text-xl" />
                  )}
                </button>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default HomeFront;
