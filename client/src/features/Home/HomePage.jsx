import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";
import HomeFeature from "./HomeFeature";
import Search from "../../components/Search";

const HomePage = () => {
  return (
    <>
      <Search />
      <HomeBanner />
      <HomeFeature />
      <Recommend type={"albums"} />
      <Recommend type={"playlists"} />
    </>
  );
};

export default HomePage;
