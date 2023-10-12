import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGetCurrentUserQuery, useLikeSongMutation } from "../app/apiSlice";

const LikeButton = ({ likes, songId }) => {
  const { id: userId } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);
  const { data: user } = useGetCurrentUserQuery(userId);
  const [likeSong] = useLikeSongMutation();

  useEffect(() => {
    if (user?.favoriteSongs?.find((song) => song._id === songId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log(user);
    console.log(user?.favoriteSongs.includes(songId));
  }, [user, songId]);

  const handleLikeClick = async () => {
    setLiked(!liked);
    const { error } = await likeSong({ songId, userId });
    if (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={`text-gray-400 bg-secondary-200 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-2 md:px-4`}
      onClick={handleLikeClick}
    >
      {liked ? (
        <span className="align-middle">
          <FaHeart className="inline-block align-baseline text-red-500 text-base md:text-xl" />
        </span>
      ) : (
        <span className="align-middle">
          <FaRegHeart className="inline-block align-baseline text-base md:text-xl" />
        </span>
      )}
      {likes && <span className="ml-2 text-xl">{likes.length}</span>}
    </button>
  );
};

export default LikeButton;
