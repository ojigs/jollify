import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../features/Home/HomePage";
import ErrorPage from "../components/ErrorPage";
import SongsPage from "../features/Song/SongsPage";
import SongPage from "../features/Song/SongPage";
import PlaylistsPage from "../features/Playlist/PlaylistsPage";
import PlaylistPage from "../features/Playlist/PlaylistPage";
import AlbumsPage from "../features/Album/AlbumsPage";
import AlbumPage from "../features/Album/AlbumPage";
import ArtistesPage from "../features/Artiste/ArtistesPage";
import ArtistePage from "../features/Artiste/ArtistePage";
import FavoritesPage from "../features/Studio/Favorites/FavoritesPage";
import MyPlaylistPage from "../features/Studio/MyPlaylists/MyPlaylistPage";
import UserProfile from "../features/Users/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explore", element: <SongsPage /> },
      { path: "songs/:id", element: <SongPage /> },
      { path: "playlists", element: <PlaylistsPage /> },
      { path: "playlists/:id", element: <PlaylistPage /> },
      { path: "albums", element: <AlbumsPage /> },
      { path: "albums/:id", element: <AlbumPage /> },
      { path: "artistes", element: <ArtistesPage /> },
      { path: "artistes/:id", element: <ArtistePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "myPlaylist", element: <MyPlaylistPage /> },
      { path: "users/:id", element: <UserProfile /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
