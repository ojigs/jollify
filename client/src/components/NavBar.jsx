import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaCompactDisc,
  FaHeadphones,
  FaFolderOpen,
  FaUserAstronaut,
  FaRegHeart,
} from "react-icons/fa";
import { MdQueue } from "react-icons/md";
import { useEffect } from "react";

const NavBar = () => {
  const selectedTheme = useSelector((state) => state.theme);
  useEffect(() => {
    console.log(selectedTheme);
  }, [selectedTheme]);
  return (
    <>
      <nav className="flex flex-col text-white py-4">
        <h1>Jollify</h1>
        <div className="flex items-center justify-center h-16">
          <img src="logo.svg" alt="logo" className="h-16" />
        </div>
        <ul className="flex flex-col flex-1 gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center justify-center w-full  hover:text-${selectedTheme} ${
                  isActive
                    ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                    : ""
                }`
              }
            >
              <FaHome className="text-base" />
              <span className="ml-4">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-${selectedTheme} ${
                  isActive
                    ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                    : ""
                }`
              }
            >
              <FaCompactDisc className="text-base" />
              <span className="ml-4">Explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/playlists"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-${selectedTheme} ${
                  isActive
                    ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                    : ""
                }`
              }
            >
              <FaHeadphones className="text-base" />
              <span className="ml-4">Playlists</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/albums"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-${selectedTheme} ${
                  isActive
                    ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                    : ""
                }`
              }
            >
              <FaFolderOpen className="text-base" />
              <span className="ml-4">Albums</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artistes"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-${selectedTheme} ${
                  isActive
                    ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                    : ""
                }`
              }
            >
              <FaUserAstronaut className="text-base" />
              <span className="ml-4">Artistes</span>
            </NavLink>
          </li>
        </ul>
        <div className="mt-8">
          <div className="mx-4 mb-4 flex items-center">
            <h2 className="text-xs font-mono tracking-widest">STUDIO</h2>
            <span className="mx-2 flex-grow h-[1px] bg-gray-500"></span>
          </div>
          <ul className="flex flex-col flex-1 gap-8">
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center justify-center w-full  hover:text-${selectedTheme} ${
                    isActive
                      ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                      : ""
                  }`
                }
              >
                <FaRegHeart className="text-base" />
                <span className="ml-4">Favorites</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myPlaylist"
                className={({ isActive }) =>
                  `flex items-center justify-center w-full  hover:text-${selectedTheme} ${
                    isActive
                      ? `text-${selectedTheme} border-r-4 border-${selectedTheme}`
                      : ""
                  }`
                }
              >
                <MdQueue className="text-base" />
                <span className="ml-4">My Playlists</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
