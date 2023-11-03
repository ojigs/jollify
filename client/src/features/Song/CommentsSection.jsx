import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { useAddCommentMutation } from "./songApiSlice";
import { toggleLoginModal, setMessage } from "../../app/modalSlice";
import { FaUserCircle } from "react-icons/fa";
import RelativeTime from "../../components/RelativeTime";

const CommentsSection = ({ comments, songId }) => {
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [newComment, setNewComment] = useState("");
  const [validationErrors, setValidationErrors] = useState(null);
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(setMessage("add a comment"));
      dispatch(toggleLoginModal());
      return;
    }
    if (!newComment) {
      setValidationErrors("Please write a comment");
      return;
    }
    const sanitizedComment = DOMPurify.sanitize(newComment);
    const { error } = await addComment({
      songId,
      body: { text: sanitizedComment },
    });
    if (error) {
      console.log(error);
    }
    setNewComment("");
    inputRef.current.value = null;
  };

  return (
    <section className="mt-6">
      <h2 className="text-xl md:text-2xl mb-4 md:font-semibold">Comments</h2>
      <form onSubmit={handleAddComment}>
        <div className="mb-8 lg:w-3/4 flex flex-col justify-center items-start">
          <textarea
            ref={inputRef}
            className="w-full lg:h-36 p-2 border bg-secondary-100 bg-opacity-80 focus:outline-none focus:outline-gray-600 focus:outline-offset-1 border-gray-500 rounded-lg resize-none"
            placeholder="Add a comment..."
            onChange={(e) => setNewComment(e.target.value.trim())}
          />
          {validationErrors && (
            <span className="block text-sm mt-2 saturate-100 text-red-500">
              {validationErrors}
            </span>
          )}
          <button
            type="submit"
            className={`bg-${selectedTheme} ${
              isLoading
                ? "bg-opacity-90 cursor-not-allowed"
                : `hover:bg-${selectedTheme}-50 active:bg-opacity-50`
            }  py-2 px-4 rounded-lg mt-4 self-end`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add Comment"}
          </button>
        </div>
      </form>

      {comments && comments.length > 0 ? (
        <article>
          {comments.map((comment, index) => (
            <div
              key={comment._id}
              className="flex items-start gap-4 mb-6 lg:w-3/4"
            >
              <div className="w-14 h-14 rounded-full">
                <Link to={`/users/${comment.user._id}`}>
                  {comment?.user?.image ? (
                    <img
                      src={comment?.user.image}
                      alt={comment?.user.username}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="w-12 h-12 pt-2 text-gray-400 rounded-full" />
                  )}
                </Link>
              </div>
              <div className="ml-3 flex-grow">
                <h3 className="text-lg font-semibold">
                  <Link
                    to={`/users/${comment.user._id}`}
                    className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
                  >
                    {comment?.user.username}
                  </Link>
                </h3>
                <p className="text-gray-300 mt-2">{comment?.text}</p>
                <p className="text-gray-400 mt-2">
                  <RelativeTime createdAt={comment.createdAt} />
                </p>
                {index !== comments.length - 1 && (
                  <p className="h-[1px] bg-gray-600 mt-6"></p>
                )}
              </div>
            </div>
          ))}
        </article>
      ) : (
        <p className="italic">No comment yet. Be the first to add a comment</p>
      )}
    </section>
  );
};

export default CommentsSection;
