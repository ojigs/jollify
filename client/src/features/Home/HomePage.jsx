import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";
import HomeFeature from "./HomeFeature";
import Search from "../../components/Search";
import HomeFront from "./HomeFront";
import LoginModal from "../../components/LoginModal";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Jollify</title>
      </Helmet>
      <Search />
      <HomeBanner />
      <HomeFront />
      <HomeFeature />
      <Recommend type={"albums"} />
      <Recommend type={"playlists"} />
      <LoginModal />
    </>
  );
};

export default HomePage;
