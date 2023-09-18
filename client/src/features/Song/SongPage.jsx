import SongDetail from "./SongDetail";
import LikeButton from "./LikeButton";
import Lyrics from "./Lyrics";
import CommentsSection from "./CommentsSection";

const SongPage = ({ songData }) => {
  return (
    <div className="bg-primary text-gray-200 p-4">
      <div className="flex gap-4">
        <SongDetail song={songData} />
        <LikeButton />
      </div>
      <Lyrics song={songData} />
      <CommentsSection song={songData} />
    </div>
  );
};

export default SongPage;
