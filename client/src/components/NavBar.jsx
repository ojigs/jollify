import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaCompactDisc, FaHeadphones } from "react-icons/fa";
import { useEffect } from "react";

const NavBar = () => {
  const selectedTheme = useSelector((state) => state.theme);
  useEffect(() => {
    console.log(selectedTheme);
  }, [selectedTheme]);
  return (
    <>
      <h1>Jollify</h1>
      <nav className="flex flex-col h-screen text-white">
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
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
