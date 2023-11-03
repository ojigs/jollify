import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetTopSongsQuery } from "../Song/songApiSlice";
import { FaClock } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";
import ErrorMsg from "../../components/ErrorMsg";
import LikeButton from "../../components/LikeButton";
import { setQueue, setPlaying } from "../MusicPlayer/playerSlice";

const HomeFront = () => {
  const {
    data: songs,
    isLoading,
    isError,
    error,
  } = useGetTopSongsQuery(5, { refetchOnReconnect: true });
  const selectedTheme = useSelector((state) => state.theme);
  const songRefs = useRef([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

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

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const index = songRefs.current.findIndex(
      (ref) => ref.offsetTop + 300 >= scrollPosition
    );

    setHighlightedIndex(index);
  };

  const handlePlay = (index) => {
    dispatch(setQueue({ queue: songs, index }));
    dispatch(setPlaying(true));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative mt-8 text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-2xl font-bold">Jollify Top 50</h2>
        <Link
          to={`/songs`}
          className={`text-base text-${selectedTheme} hover:text-${selectedTheme}-50 active:text-opacity-75 font-bold`}
        >
          See all
        </Link>
      </div>
      {isError ? (
        <div className="h-80">
          <ErrorMsg error={error} />
        </div>
      ) : (
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
      )}
      <div className="">
        {isLoading && (
          <div className="grid grid-rows-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-12 bg-secondary-100 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        )}
        {songs &&
          songs?.map((song, index) => (
            <article
              ref={(el) => (songRefs.current[index] = el)}
              onClick={() => handlePlay(index)}
              className={`grid grid-cols-6 md:grid-cols-12 gap-4 items-center p-1 rounded-md cursor-pointer ${
                currentSong && currentSong?._id === song._id
                  ? `bg-${selectedTheme} bg-opacity-50`
                  : index === highlightedIndex
                  ? "bg-primary"
                  : ""
              } `}
              key={song._id}
            >
              <div className="col-span-1 md:col-span-1 text-center m-auto">
                {currentSong && currentSong._id === song._id && isPlaying ? (
                  <BsSoundwave className={`animate-pulse`} />
                ) : index === highlightedIndex ? (
                  <BsPlay />
                ) : (
                  <div>{index + 1}</div>
                )}
              </div>
              <div className="col-span-1 md:col-span-1 overflow-hidden">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className=" rounded-md"
                />
              </div>
              <div className="col-span-3 md:col-span-4 flex flex-col items-start ">
                <Link
                  to={`/songs/${song._id}`}
                  className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
                >
                  {song.title}
                </Link>
                <Link
                  to={`/artistes/${song.artiste._id}`}
                  className={`text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
                >
                  {song.artiste.name}
                </Link>
              </div>
              <div className="hidden md:block col-span-3 truncate ...">
                <Link
                  to={`/albums/${song.album?._id}`}
                  className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme} truncate ...`}
                >
                  {song.album?.title}
                </Link>
              </div>
              <div className="hidden md:block col-span-2">
                <div>{song.duration}</div>
              </div>
              <div className="col-span-1 md:col-span-1 text-center">
                <LikeButton songId={song._id} type={"song"} />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default HomeFront;
