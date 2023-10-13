import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useGetCurrentUserQuery,
  useLikeSongMutation,
  useLikeAlbumMutation,
  useLikePlaylistMutation,
  useLikeArtisteMutation,
} from "../app/apiSlice";
import { setMessage, toggleLoginModal } from "../app/modalSlice";

const LikeButton = ({ songId, albumId, artisteId, playlistId, type }) => {
  const { id: userId } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: user } = useGetCurrentUserQuery(userId);
  const [likeSong] = useLikeSongMutation();
  const [likeAlbum] = useLikeAlbumMutation();
  const [likeArtiste] = useLikeArtisteMutation();
  const [likePlaylist] = useLikePlaylistMutation();
  const dispatch = useDispatch();

  const isSong = type === "song";
  const isAlbum = type === "album";
  const isArtiste = type === "artiste";
  const isPlaylist = type === "playlist";

  useEffect(() => {
    switch (true) {
      case isSong:
        if (user?.favoriteSongs?.find((song) => song._id === songId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        break;
      case isAlbum:
        if (user?.favoriteAlbums?.find((album) => album._id === albumId)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        break;
      case isArtiste:
        if (
          user?.favoriteArtistes?.find((artiste) => artiste._id === artisteId)
        ) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        break;
      case isPlaylist:
        if (
          user?.favoritePlaylists?.find(
            (playlist) => playlist._id === playlistId
          )
        ) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        break;

      default:
        break;
    }
  }, [
    user,
    songId,
    albumId,
    artisteId,
    playlistId,
    isSong,
    isAlbum,
    isArtiste,
    isPlaylist,
  ]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      switch (true) {
        case isSong:
          dispatch(setMessage("add song to favorite"));
          break;
        case isAlbum:
          dispatch(setMessage("add album to favorite"));
          break;
        case isPlaylist:
          dispatch(setMessage("add playlist to favorite"));
          break;
        default:
          break;
      }
      dispatch(toggleLoginModal());
      return;
    }

    setLiked(!liked);

    switch (true) {
      case isSong:
        await likeSong({ songId, userId })
          .unwrap()
          .catch((error) => console.log(error));
        break;
      case isAlbum:
        await likeAlbum({ albumId, userId })
          .unwrap()
          .catch((error) => console.log(error));
        break;
      case isArtiste:
        await likeArtiste({ artisteId, userId })
          .unwrap()
          .catch((error) => console.log(error));
        break;
      case isPlaylist:
        await likePlaylist({ playlistId, userId })
          .unwrap()
          .catch((error) => console.log(error));
        break;

      default:
        break;
    }
  };

  return (
    <button className={`text-gray-400`} onClick={handleLikeClick}>
      <span className="align-middle">
        {liked ? (
          <FaHeart className="inline-block align-baseline text-red-500 text-base md:text-xl" />
        ) : (
          <FaRegHeart className="inline-block align-baseline text-base md:text-xl" />
        )}
      </span>
    </button>
  );
};

export default LikeButton;
