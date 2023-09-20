import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ likes, isLiked, onToggleLike }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
    onToggleLike(!liked);
  };

  return (
    <button
      className={`text-gray-400 inset-0 flex flex-row items-center justify-center bg-secondary-200 hover:bg-secondary-100 active:bg-opacity-50 rounded-lg transition duration-300 ease-in-out py-1 px-6`}
      onClick={handleLikeClick}
    >
      {liked ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
      <span className="ml-2 text-xl">{likes.length}</span>
    </button>
  );
};

export default LikeButton;
