import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import LikeButton from "./LikeButton";
import { trimText } from "../utils";

const SongList = ({ songs, listType }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const songsPerPage = 5;
  const [visibleSongs, setVisibleSongs] = useState(songsPerPage);
  const isPlaylist = listType === "playlist";

  const handleMoreClick = () => {
    setVisibleSongs(visibleSongs + songsPerPage);
  };

  return (
    <ul>
      {songs.slice(0, visibleSongs).map((song, index) => (
        <li
          key={song._id}
          className={`flex items-center justify-between p-4 ${
            song.isPlaying
              ? `bg-${selectedTheme} bg-opacity-50`
              : index % 2 === 0
              ? "bg-secondary-100"
              : "bg-secondary-200"
          }`}
        >
          <button className="flex items-center">
            <FaPlay className="text-base" />
          </button>
          <div className="flex-grow px-8">
            {isPlaylist ? (
              <div className="flex flex-col">
                <Link
                  to={`/songs/${song._id}`}
                  className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                >
                  {trimText(song.title)}
                </Link>
                <Link
                  to={`/artistes/${song.artiste._id}`}
                  className={`text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                >
                  {song.artiste.name}
                </Link>
              </div>
            ) : (
              <Link
                to={`/songs/${song._id}`}
                className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
              >
                {trimText(song.title)}
              </Link>
            )}
          </div>
          <p className="mr-2">{song.duration}</p>
          <LikeButton songId={song._id} type={"song"} />
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
