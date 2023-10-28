import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import LikeButton from "./LikeButton";
import AddToPlaylistButton from "./AddToPlaylistButton";
import { setPlaying, setQueue } from "../features/MusicPlayer/playerSlice";

const SongList = ({ songs, listType }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const songsPerPage = 5;
  const [visibleSongs, setVisibleSongs] = useState(songsPerPage);
  const isPlaylist = listType === "playlist";
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  const handleMoreClick = () => {
    setVisibleSongs(visibleSongs + songsPerPage);
  };

  const handlePlay = (index) => {
    dispatch(setQueue({ queue: songs, index }));
    dispatch(setPlaying(true));
  };

  return (
    <ul>
      {songs.slice(0, visibleSongs).map((song, index) => (
        <li
          key={song._id}
          className={`grid grid-cols-6 md:grid-cols-12 items-center justify-between gap-4 w-full rounded-md p-4 ${
            currentSong._id === song._id
              ? `bg-${selectedTheme} bg-opacity-50`
              : index % 2 === 0
              ? "bg-secondary-100"
              : "bg-secondary-200"
          }`}
        >
          <div className="col-span-1">
            <button onClick={() => handlePlay(index)}>
              {isPlaying && currentSong && currentSong._id === song._id ? (
                <BsSoundwave className={`animate-pulse`} />
              ) : (
                <FaPlay className="text-base" />
              )}
            </button>
          </div>
          <div className="col-span-2 md:col-span-8 flex flex-col gap-1 items-start truncate ...">
            {isPlaylist ? (
              <>
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
              </>
            ) : (
              <Link
                to={`/songs/${song._id}`}
                className={`truncate ... hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
              >
                {song.title}
              </Link>
            )}
          </div>
          <div className="col-span-3 justify-end items-center flex gap-2 sm:gap-4">
            <span className="col-span-1 text-end">{song.duration}</span>
            <div className="col-span-1 text-end">
              <span
                className={`${
                  index % 2 === 0 ? "bg-secondary-200" : "bg-secondary-100"
                } p-2 rounded-md inline-flex items-center`}
              >
                <LikeButton songId={song._id} type={"song"} />
              </span>
            </div>
            <div className="col-span-1 text-end">
              <span
                className={`${
                  index % 2 === 0 ? "bg-secondary-200" : "bg-secondary-100"
                } p-2 rounded-md inline-flex items-center`}
              >
                <AddToPlaylistButton songId={song._id} />
              </span>
            </div>
          </div>
        </li>
      ))}
      {visibleSongs < songs.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleMoreClick}
            className={`text-white px-4 py-2 border-${selectedTheme} border rounded-full hover:bg-primary-dark transition`}
          >
            More &darr;
          </button>
        </div>
      )}
    </ul>
  );
};

export default SongList;
