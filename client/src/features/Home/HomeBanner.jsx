import backgroundImage from "../../assets/images/hero-image.jpg";

const HomeBanner = () => {
  const overlayStyle = {
    background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
    backdropFilter: "blur(5px)", // Adjust the blur amount as needed
  };
  return (
    <section
      className=" relative bg-accent bg-center bg-no-repeat h-[400px] flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-white"
        style={overlayStyle}
      >
        <h1 className="text-5xl font-bold mb-4">Discover Great Music</h1>
        <p className="text-lg mb-6">
          Explore the latest songs, albums, and playlists
        </p>
        <button className="bg-accent text-white hover:bg-primary-dark py-2 px-6 rounded-full text-lg font-semibold transition duration-300">
          Get Started
        </button>
      </div>
    </section>
    // <div
    //   className="h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
    //   style={{ backgroundImage: `url(${backgroundImage})` }}
    // >
    //   {/* Add your content here */}
    //   <div className="text-center">
    //     <h1 className="text-6xl lg:text-8xl text-white font-bold drop-shadow-xl">
    //       Music App
    //     </h1>
    //     <p className="text-xl lg:text-2xl text-gray-200 mt-4">
    //       The best app for listening to your favorite music.
    //     </p>
    //     <button className="bg-primary-700 text-white px-6 py-3 rounded-lg mt-8 hover:bg-primary-800 focus:outline-none focus:ring-primary-300">
    //       Get started
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomeBanner;
