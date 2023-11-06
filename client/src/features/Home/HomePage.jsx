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
        <link rel="canonical" href="https://jollify.vercel.app" />
        <meta
          name="description"
          content="Your one-stop-shop for all things music. Discover new artists, create playlists, and enjoy your favorite tunes on the go."
        />
        <meta property="og:title" content="Jollify" />
        <meta
          property="og:description"
          content="Your one-stop-shop for all things music. Discover new artists, create playlists, and enjoy your favorite tunes on the go."
        />
        <meta property="og:url" content="https://jollify.vercel.app/" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/ojigs/image/upload/v1698244556/Jollify/jollify_ngrhlr.jpg"
        />
        <meta property="og:site_name" content="Jollify" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jollify" />
        <meta
          name="twitter:description"
          content="Your one-stop-shop for all things music. Discover new artists, create playlists, and enjoy your favorite tunes on the go."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/ojigs/image/upload/v1698244556/Jollify/jollify_ngrhlr.jpg"
        />
        <title>Jollify</title>
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
