import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../features/Home/HomePage";
import ErrorPage from "../components/ErrorPage";
import SongsPage from "../features/Song/SongsPage";
import SongPage from "../features/Song/SongPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <SongsPage /> },
      { path: "songs/:id", element: <SongPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
