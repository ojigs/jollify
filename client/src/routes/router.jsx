import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../features/Home/HomePage";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
