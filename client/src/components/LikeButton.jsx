import { useState } from "react";
import { BiHeart, BiHeartOutline } from "react-icons/bi";

const LikeButton = ({ isLiked, onToggleLike }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
    onToggleLike(!liked);
  };

  return (
    <button
      className={`${
        liked ? "text-red-500" : "text-gray-400"
      } transition-colors duration-300 ease-in-out focus:outline-none`}
      onClick={handleLikeClick}
    >
      {liked ? (
        <BiHeart className="text-2xl" />
      ) : (
        <BiHeartOutline className="text-2xl" />
      )}
    </button>
  );
};

export default LikeButton;
