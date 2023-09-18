import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../features/Home/HomePage";
import ErrorPage from "../components/ErrorPage";
import SongsPage from "../features/Song/SongsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/explore", element: <SongsPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
