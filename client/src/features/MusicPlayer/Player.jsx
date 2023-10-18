import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaListUl,
  FaRedo,
  FaCompactDisc,
  FaVolumeMute,
  FaVolumeUp,
  FaVolumeDown,
} from "react-icons/fa";
import {
  setPlaying,
  setCurrentTime,
  setDuration,
  setIsMuted,
  setVolume,
  setPrevVolume,
} from "./playerSlice";
import { convertToSeconds } from "../../utils";

const Player = ({ song }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isPlaying } = useSelector((state) => state.player);
  const { currentTime } = useSelector((state) => state.player);
  const { isMuted } = useSelector((state) => state.player);
  const { volume } = useSelector((state) => state.player);
  const { prevVolume } = useSelector((state) => state.player);
  const { duration } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDuration(convertToSeconds(song?.duration ?? "2:23")));
  }, [song, dispatch]);

  const handleTogglePlay = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const handleNext = () => {
    console.log("Next song");
  };

  const handlePrev = () => {
    console.log("Prev song");
  };

  const handlePlayerChange = (e) => {
    dispatch(setIsMuted(false));
    dispatch(setCurrentTime(Number(e.target.value)));
  };

  const handleToggleMute = () => {
    if (isMuted) {
      dispatch(setVolume(prevVolume));
    } else {
      dispatch(setPrevVolume(volume));
      dispatch(setVolume(0));
    }
    dispatch(setIsMuted(!isMuted));
  };

  const handleVolumeChange = (e) => {
    dispatch(setVolume(e.target.value));
  };

  return (
    <article
      className={`relative p-4 bg-primary bg-opacity-95 backdrop-blur-lg text-white`}
    >
      <div className="flex items-center justify-between">
        {/* Song Details */}
        <div className="flex items-center">
          {song?.coverImage ? (
            <img
              src="song-cover.jpg"
              alt="Song Cover"
              className="w-14 h-14 rounded-md mr-4"
            />
          ) : (
            <div className="bg-secondary-200 mr-4 w-14 h-14 rounded-md">
              <FaCompactDisc className="w-full h-full p-2 text-gray-400" />
            </div>
          )}
          <div className="w-20">
            <p className="font-bold truncate ...">Song Title</p>
            <p className="truncate ...">Artiste</p>
          </div>
        </div>

        {/* Play Controls */}
        <div className="flex items-center justify-center gap-4">
          <FaStepBackward onClick={handlePrev} className="cursor-pointer" />
          <button
            onClick={handleTogglePlay}
            className={`p-4 rounded-full bg-${selectedTheme}`}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <FaStepForward onClick={handleNext} className="cursor-pointer" />
        </div>

        {/* Additional Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center gap-4">
            <FaHeart className="cursor-pointer" />
            <FaListUl className="cursor-pointer" />
            <FaRedo className="cursor-pointer" />
          </div>
          {/* Volume Controls */}
          <div className="flex items-center gap-2">
            {isMuted ? (
              <FaVolumeMute
                className="cursor-pointer"
                onClick={handleToggleMute}
              />
            ) : volume > 70 ? (
              <FaVolumeUp
                className="cursor-pointer"
                onClick={handleToggleMute}
              />
            ) : volume > 0 ? (
              <FaVolumeDown
                className="cursor-pointer"
                onClick={handleToggleMute}
              />
            ) : (
              <FaVolumeMute
                className="cursor-pointer"
                onClick={handleToggleMute}
              />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={`w-32 outline-none accent-${selectedTheme} rounded-full h-[2px]`}
            />
          </div>
        </div>
      </div>

      {/* Audio Rail */}
      <div className="w-80">
        {/* Implement the audio slider here */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handlePlayerChange}
          className={`w-full absolute left-0 top-0 h-[1px] accent-${selectedTheme} rounded-full outline-none`}
        />
      </div>
    </article>
  );
};

export default Player;
