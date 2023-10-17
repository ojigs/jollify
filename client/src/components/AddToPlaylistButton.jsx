import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddToPlaylistModal,
  toggleLoginModal,
  setMessage,
  setSongId,
} from "../app/modalSlice";
import { FaPlus } from "react-icons/fa";

const AddToPlaylistButton = ({ songId }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openModal = (songId) => {
    if (!isAuthenticated) {
      dispatch(setMessage("add song to playlist"));
      dispatch(toggleLoginModal());
    } else {
      dispatch(setSongId(songId));
      dispatch(toggleAddToPlaylistModal());
    }
  };

  return (
    <button onClick={() => openModal(songId)}>
      <FaPlus className="font-extralight" />
    </button>
  );
};

export default AddToPlaylistButton;
