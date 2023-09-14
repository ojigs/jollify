import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaMusic } from "react-icons/fa";

const NavBar = () => {
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
                `flex items-center justify-center w-full  hover:text-accent ${
                  isActive ? "text-accent border-r-4 border-accent" : ""
                }`
              }
            >
              <FaHome className="text-base" />
              <span className="ml-4">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/music"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-accent ${
                  isActive ? "text-accent border-r-4 border-accent" : ""
                }`
              }
            >
              <FaMusic className="text-base" />
              <span className="ml-4">Music</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center justify-center w-full hover:text-accent ${
                  isActive ? "text-accent border-r-4 border-accent" : ""
                }`
              }
            >
              <FaUser className="text-base" />
              <span className="ml-4">Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
