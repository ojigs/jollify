import heroBackground from "../../assets/images/jollify_banner.jpg";
import bannerImage from "../../assets/images/hero-image.png";

const HomeBanner = () => {
  const overlayStyle = {
    background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
    backdropFilter: "blur(5px)",
  };
  return (
    <>
      <section
        className=" relative bg-accent-50 bg-center bg-no-repeat h-[400px] rounded-md flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div
          className="absolute inset-0 rounded-md flex flex-col justify-center items-start p-6 text-white"
          style={overlayStyle}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover Great Music
          </h1>
          <p className="text-lg mb-10 text-gray-300">
            Explore the latest songs, albums, and playlists
          </p>
          <button className="bg-accent text-white hover:bg-accent-50 py-2 px-6 rounded-full text-lg font-semibold transition duration-300">
            Start listening
          </button>
        </div>
        <div
          className="hidden lg:block absolute right-0 bottom-0 w-[295px] h-[inherit]"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: "bottom-right",
            backgroundSize: "cover",
          }}
        ></div>
      </section>
    </>
  );
};

export default HomeBanner;
