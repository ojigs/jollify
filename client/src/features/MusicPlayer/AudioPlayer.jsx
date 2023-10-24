import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime, setDuration, setPlaying } from "./playerSlice";

const AudioPlayer = ({ audioRef, restartSong, handleNext, setIsLoading }) => {
  const { isPlaying, currentSong, currentIndex, queue, repeat } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();

  const src = audioRef?.current?.src ?? null;

  useEffect(() => {
    if (isPlaying && audioRef.current.src) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, src, audioRef]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      dispatch(setCurrentTime(currentTime));
      // const { buffered, duration } = audioRef.current;
      // if (
      //   buffered.length > 0 &&
      //   buffered.end(0) - currentTime < 1 &&
      //   buffered.end(0) < duration
      // ) {
      //   setIsLoading(true);
      // } else {
      //   setIsLoading(false);
      // }
    }
  };

  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    switch (repeat) {
      case "off":
        if (currentIndex !== queue.length - 1) {
          handleNext();
        } else {
          dispatch(setPlaying(false));
        }
        break;
      case "single":
        restartSong();
        break;
      case "all":
        handleNext();
        break;
      default:
        break;
    }
  };

  const handleCanPlay = () => {
    if (isPlaying && audioRef.current.src) {
      setIsLoading(false);
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleWait = () => {
    setIsLoading(true);
  };

  return (
    <audio
      ref={audioRef}
      src={currentSong}
      onCanPlay={handleCanPlay}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetaData}
      onEnded={handleEnded}
      onWaiting={handleWait}
    />
  );
};

export default AudioPlayer;
