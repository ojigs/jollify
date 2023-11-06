import { useEffect } from "react";
import HomeBanner from "./HomeBanner";
import Recommend from "../../components/Recommend";
import HomeFeature from "./HomeFeature";
import Search from "../../components/Search";
import HomeFront from "./HomeFront";
import { Helmet } from "react-helmet-async";
import { useLoginSuccessQuery } from "../Auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProvider } from "../Auth/authSlice";

const HomePage = () => {
  const { provider } = useSelector((state) => state.auth);
  const { isSuccess, isError } = useLoginSuccessQuery(undefined, {
    skip: !provider,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Success: Login successful");
      dispatch(setProvider(null));
    } else if (isError) {
      dispatch(setProvider(null));
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <>
      <Helmet>
        <title>Jollify</title>
        <link rel="canonical" href="https://jollify.vercel.app" />
      </Helmet>
      <Search />
      <HomeBanner />
      <HomeFront />
      <HomeFeature />
      <Recommend type={"albums"} />
      <Recommend type={"playlists"} />
    </>
  );
};

export default HomePage;
