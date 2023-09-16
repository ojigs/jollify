import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <Recommend type={"albums"} />
      <Recommend type={"playlists"} />
    </>
  );
};

export default HomePage;
