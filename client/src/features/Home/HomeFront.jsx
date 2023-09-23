import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { trimText } from "../../utils";

const HomeFront = ({ songs }) => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
        <div className="col-span-1 text-center font-semibold">
          <div>#</div>
        </div>
        <div className="col-span-1 md:col-span-1 font-semibold">
          <div>Img</div>
        </div>
        <div className="col-span-3 md:col-span-4 font-semibold">
          <div>Title</div>
        </div>
        <div className="hidden md:block col-span-3 font-semibold">
          <div>Album</div>
        </div>
        <div className="hidden md:block col-span-2 font-semibold">
          <div>Duration</div>
        </div>
        <div className="col-span-1 md:col-span-1 text-center font-semibold">
          <div>Favorite</div>
        </div>
      </div>
      <div className="">
        {songs.map((song, index) => (
          <article
            className="grid grid-cols-6 md:grid-cols-12 gap-4"
            key={song._id}
          >
            <div className="col-span-1 md:col-span-1 text-center">
              <div>{index + 1}</div>
            </div>
            <div className="col-span-1 md:col-span-1">
              <div>{song.img}</div>
            </div>
            <div className="col-span-3 md:col-span-4 flex flex-col">
              <Link
                to={`/songs/${song._id}`}
                className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
              >
                {song.title}
              </Link>
              <Link
                to={`/artistes/${song.artiste._id}`}
                className={`text-sm text-gray-400 hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
              >
                {song.artiste.name}
              </Link>
            </div>
            <div className="hidden md:block col-span-3">
              <Link
                to={`/albums/${song.album._id}`}
                className={`hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-${selectedTheme}`}
              >
                {trimText(song.album.title)}
              </Link>
            </div>
            <div className="hidden md:block col-span-2">
              <div>{song.duration}</div>
            </div>
            <div className="col-span-1 md:col-span-1 text-center">
              <div>{song.favorite}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default HomeFront;
