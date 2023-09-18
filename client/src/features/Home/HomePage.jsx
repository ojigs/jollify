import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";
import HomeFeature from "./HomeFeature";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <HomeFeature
        artisteName={"Ruger"}
        albumTitle={"Ru da world"}
        songTitle={"Blue"}
      />
      <Recommend type={"albums"} />
      <Recommend type={"playlists"} />
    </>
  );
};

export default HomePage;
