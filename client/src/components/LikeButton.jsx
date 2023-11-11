import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useGetCurrentUserQuery } from "../features/Users/userApiSlice";
import { useLikeSongMutation } from "../features/Song/songApiSlice";
import { useLikeAlbumMutation } from "../features/Album/albumApiSlice";
import { useLikePlaylistMutation } from "../features/Playlist/playlistApiSlice";
import { useLikeArtisteMutation } from "../features/Artiste/artisteApiSlice";
import { setMessage, toggleLoginModal } from "../app/modalSlice";
import { toast } from "react-toastify";

const LikeButton = ({ songId, albumId, artisteId, playlistId, type }) => {
  const [liked, setLiked] = useState();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: user } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });
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
        }
        break;
      case isAlbum:
        if (user?.favoriteAlbums?.find((album) => album._id === albumId)) {
          setLiked(true);
        }
        break;
      case isArtiste:
        if (user?.favoriteArtistes?.find((id) => id === artisteId)) {
          setLiked(true);
        }
        break;
      case isPlaylist:
        if (
          user?.favoritePlaylists?.find(
            (playlist) => playlist._id === playlistId
          )
        ) {
          setLiked(true);
        }
        break;

      default:
        setLiked(false);
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
        case isArtiste:
          dispatch(setMessage("follow this artiste"));
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
        await likeSong({ songId, userId: user._id })
          .unwrap()
          .catch((error) => {
            toast.error("An error occured");
            console.error(error);
          });
        break;
      case isAlbum:
        await likeAlbum({ albumId, userId: user._id })
          .unwrap()
          .catch((error) => console.error(error));
        break;
      case isArtiste:
        await likeArtiste({ artisteId, userId: user._id })
          .unwrap()
          .catch((error) => console.error(error));
        break;
      case isPlaylist:
        await likePlaylist({ playlistId, userId: user._id })
          .unwrap()
          .catch((error) => console.error(error));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <button
        className={``}
        onClick={handleLikeClick}
        title={isArtiste ? "Follow" : "Add to favorite"}
      >
        {liked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="" />
        )}
      </button>
    </>
  );
};

export default LikeButton;
