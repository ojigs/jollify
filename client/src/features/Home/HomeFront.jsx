import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetTopSongsQuery } from "../../app/apiSlice";
import { FaHeart, FaRegHeart, FaClock } from "react-icons/fa";

const HomeFront = () => {
  const { data: songs } = useGetTopSongsQuery(5);
  // const songRefs = songs.map(() => useRef());
  const [likedSongs, setLikedSongs] = useState([]);

  const songRefs = useRef([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // const generateKey = async () => {
  //   const encryptionKey = await crypto.subtle.generateKey(
  //     {
  //       name: "AES-GCM",
  //       length: 256,
  //     },
  //     true,
  //     ["encrypt", "decrypt"]
  //   );
  //   return encryptionKey;
  // };

  // const key = generateKey();

  // console.log(key);

  // Function to handle scrolling and set highlighted song
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const index = songRefs.current.findIndex(
      (ref) => ref.offsetTop >= scrollPosition
    );

    setHighlightedIndex(index);
  };

  useEffect(() => {
    // Attach scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          to={`/songs`}
          className={`text-base text-${selectedTheme} hover:text-${selectedTheme}-50 active:text-opacity-75 font-bold`}
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 mb-2">
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
          songs?.map((song, index) => (
            <article
              ref={(el) => (songRefs.current[index] = el)}
              className={`grid grid-cols-6 md:grid-cols-12 gap-4 items-center p-1 ${
                index === highlightedIndex ? "bg-primary" : ""
              } `}
              key={song._id}
            >
              <div className="col-span-1 md:col-span-1 text-center">
                <div>{index + 1}</div>
              </div>
              <div className="col-span-1 md:col-span-1 overflow-hidden">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className=" rounded-md"
                />
              </div>
              <div className="col-span-3 md:col-span-4 flex flex-col ">
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
              <div className="hidden md:block col-span-3 truncate ...">
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
