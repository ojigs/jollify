import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeBanner = () => {
  const selectedTheme = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/explore");
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative bg-${selectedTheme}-50 bg-cover bg-center bg-no-repeat h-[400px] rounded-md flex flex-col justify-center items-center text-white`}
        style={{
          backgroundImage: `url("https://res.cloudinary.com/ojigs/image/upload/v1698508697/Jollify/jollify_bg_o1mvww.webp")`,
        }}
      >
        <div className="absolute inset-0 rounded-md flex flex-col justify-center items-start p-6 text-white bg-primary bg-opacity-60">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover Great Music
          </h1>
          <p className="md:text-lg mb-10 text-gray-300">
            Explore the latest songs, albums, and playlists on Jollify
          </p>
          <button
            className={`bg-${selectedTheme} text-white hover:bg-${selectedTheme}-50 active:bg-opacity-90 py-2 px-6 rounded-full md:text-lg font-semibold transition duration-300`}
            onClick={handleClick}
          >
            Start listening
          </button>
        </div>
      </motion.section>
    </>
  );
};

export default HomeBanner;
