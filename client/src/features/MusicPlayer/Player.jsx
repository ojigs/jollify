import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaCompactDisc,
  FaVolumeMute,
  FaVolumeUp,
  FaVolumeDown,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import {
  setPlaying,
  setCurrentTime,
  setIsMuted,
  setVolume,
  setPrevVolume,
  setRepeat,
  playNext,
  playPrev,
} from "./playerSlice";
import { convertSecondsToTime } from "../../utils";
import AudioPlayer from "./AudioPlayer";
import LikeButton from "../../components/LikeButton";
import AddToPlaylistButton from "../../components/AddToPlaylistButton";
const key = import.meta.env.VITE_JOLLIFY_KEY;

const Player = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const {
    isPlaying,
    currentSong,
    currentTime,
    queue,
    isMuted,
    volume,
    prevVolume,
    duration,
    repeat,
  } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState();

  const audioURL = currentSong?.audioURL ?? null;
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.src = "https://" + key + "/" + audioURL;
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      dispatch(setCurrentTime(audioRef.current.currentTime));
    }
  }, [audioURL, dispatch]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleTogglePlay = () => {
    dispatch(setPlaying(!isPlaying));
    setIsLoading(false);
  };

  const handleNext = () => {
    if (queue.length === 1) {
      restartSong();
    } else {
      dispatch(playNext());
    }
  };

  const handlePrev = () => {
    if (queue.length === 1) {
      restartSong();
    } else {
      dispatch(playPrev());
    }
  };

  const restartSong = () => {
    audioRef.current.currentTime = 0;
    dispatch(setCurrentTime(audioRef.current.currentTime));
    audioRef.current.play();
  };

  const handleSeekChange = (e) => {
    dispatch(setCurrentTime(Number(e.target.value)));
    audioRef.current.currentTime = Number(e.target.value);
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

  const handleToggleRepeat = () => {
    dispatch(setRepeat());
  };

  return (
    <>
      <article
        className={`relative p-4 bg-primary bg-opacity-95 backdrop-blur-lg text-white`}
      >
        <div className="flex items-center justify-between">
          {/* Song Details */}
          <div className="flex items-center">
            {currentSong?.coverImage ? (
              <img
                src={currentSong?.coverImage}
                alt={currentSong?.artiste?.name}
                className="w-14 h-14 rounded-md mr-4"
              />
            ) : (
              <div className="bg-secondary-200 mr-4 w-14 h-14 rounded-md">
                <FaCompactDisc className="w-full h-full p-2 text-gray-400" />
              </div>
            )}
            <div className="w-20">
              <Link
                to={`/songs/${currentSong?._id}`}
                className={`block text-sm sm:text-base font-semibold hover:underline hover:decoration-2  hover:decoration-${selectedTheme} truncate ...`}
              >
                {currentSong?.title}
              </Link>
              <Link
                to={`/artistes/${currentSong?.artiste?._id}`}
                className={`block text-sm sm:text-base hover:underline hover:decoration-2 hover:decoration-${selectedTheme} truncate ...`}
              >
                {currentSong?.artiste?.name}
              </Link>
            </div>
          </div>

          {/* Play Controls */}
          <div className="flex items-center justify-center gap-4">
            <FaStepBackward onClick={handlePrev} className="cursor-pointer" />
            <button
              onClick={handleTogglePlay}
              className={`p-4 rounded-full bg-${selectedTheme}`}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
            <FaStepForward onClick={handleNext} className="cursor-pointer" />
          </div>

          {/* Additional Controls */}
          <div className="hidden sm:flex flex-col gap-2">
            <div className="flex justify-center items-center gap-4">
              <LikeButton songId={currentSong?._id ?? null} type={"song"} />
              <button onClick={handleToggleRepeat} title="repeat">
                {repeat === "off" ? (
                  <TbRepeatOff />
                ) : repeat === "single" ? (
                  <TbRepeatOnce />
                ) : (
                  <TbRepeat />
                )}
              </button>
              <AddToPlaylistButton songId={currentSong?._id ?? null} />
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
                className={`w-20 outline-none accent-${selectedTheme} rounded-full h-[2px]`}
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <span className="hidden sm:block text-xs text-gray-400 absolute top-9 left-1/2 ml-28">
          <label htmlFor="audio rail">
            {convertSecondsToTime(currentTime)}
          </label>
          {" / "}
          <label htmlFor="audio rail">
            {convertSecondsToTime(duration === "0:00" ? 0 : duration)}
          </label>
        </span>

        {/* Audio Rail */}
        <div className="w-80">
          <input
            id="audio rail"
            type="range"
            min={0}
            max={Math.floor(duration === "0:00" ? 0 : duration)}
            step={0.0000000001}
            value={currentTime}
            onChange={handleSeekChange}
            className={`w-full transition-all ease-linear absolute left-0 top-0 h-[1px] accent-${selectedTheme} rounded-full outline-none`}
          />
        </div>
        <AudioPlayer
          audioRef={audioRef}
          restartSong={restartSong}
          handleNext={handleNext}
          setIsLoading={setIsLoading}
        />
      </article>
    </>
  );
};

export default Player;
