import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const CommentsSection = ({ comments }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    setNewComment("");
  };

  return (
    <section className="mt-6">
      <h2 className="text-2xl md:text-3xl mb-4 md:font-semibold">Comments</h2>
      <div className="mb-8 flex flex-col justify-center items-start">
        <textarea
          className="w-full lg:h-40 lg:w-3/4 p-2 border bg-secondary-100 bg-opacity-80 focus:outline-none border-gray-500 rounded-lg resize-none"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button
          className="bg-accent hover:bg-accent-50 active:bg-opacity-90 py-2 px-4 rounded-lg mt-4"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>

      {comments && comments.length > 0 ? (
        <article>
          {comments.map((comment) => (
            <div key={comment._id} className="flex mb-4">
              <div className="w-12 h-12 rounded-full flex items-start justify-center gap-4">
                {comment.user.image ? (
                  <img
                    src={comment.user.image || "default-avatar.jpg"}
                    alt={comment.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400 rounded-full" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">{comment.user.name}</h3>
                <p className="text-gray-400">{comment.text}</p>
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
