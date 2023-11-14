import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../features/Users/userApiSlice";
import {
  FaHome,
  FaCompactDisc,
  FaHeadphones,
  FaFolderOpen,
  FaUserAstronaut,
  FaRegHeart,
  FaMusic,
  FaUser,
} from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdQueue } from "react-icons/md";

const NavContent = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userImage } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
    selectFromResult: ({ data }) => ({
      userImage: data?.image ?? "",
    }),
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    setPath(pathname);
  }, [pathname, path]);

  const handleLoginClick = () => {
    switch (path) {
      case "/login":
        navigate("/signup");
        break;
      case "/signup":
        navigate("/login", { state: { from: path } });
        break;

      default:
        navigate("/login", { state: { from: path } });
        break;
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="mt-4 mb-8">
          <div className="flex w-1/2 justify-center items-center gap-2 m-auto">
            <div
              className={`w-10 h-10 flex-shrink-0  bg-${selectedTheme} rounded-full overflow-hidden`}
            >
              <Link to={`/myProfile`}>
                {userImage ? (
                  <img
                    src={userImage}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-full h-full pt-2" />
                )}
              </Link>
            </div>
            <Link to={`/myProfile`} className="truncate ...">
              {username}
            </Link>
          </div>
        </div>
      ) : (
        <div className="px-4 mt-4 mb-8">
          <button
            onClick={handleLoginClick}
            className={`bg-${selectedTheme} hover:bg-${selectedTheme} w-full text-white font-bold py-2 px-4 rounded`}
          >
            {path === "/login" ? "Sign up" : "Login"}
          </button>
        </div>
      )}
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
      {isAuthenticated && (
        <div className="mt-8">
          <div className="mx-4 mb-4 flex items-center">
            <h2
              className={`text-xs font-mono tracking-widest text-${selectedTheme}`}
            >
              STUDIO
            </h2>
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
      )}
    </>
  );
};

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectedTheme = useSelector((state) => state.theme);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { username } = useSelector((state) => state.auth);
  const { userImage } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
    selectFromResult: ({ data }) => ({
      userImage: data?.image ?? "",
    }),
  });
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    switch (path) {
      case "/login":
        navigate("/signup");
        break;
      case "/signup":
        navigate("/login", { state: { from: path } });
        break;

      default:
        navigate("/login", { state: { from: path } });
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (isMenuOpen && screenWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setPath(pathname);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 p-3 z-50 w-full bg-primary">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={handleToggleNav} title="Menu">
            <BiMenuAltLeft className="text-2xl" />
          </button>
          <h1
            className={`text-2xl flex gap-4 items-center tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className=" filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <Link to={`/`} className="saturate-200">
              Jollify
            </Link>
          </h1>
        </div>
        <div>
          {isAuthenticated ? (
            <div
              className={`w-8 h-8 overflow-hidden bg-${selectedTheme} rounded-full`}
            >
              <Link to={`/myProfile`}>
                {userImage ? (
                  <img
                    src={userImage}
                    alt={username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="w-full h-full pt-1" />
                )}
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white font-bold text-sm py-1 px-2 rounded`}
            >
              {path === "/login" ? "Sign up" : "Login"}
            </button>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 left-0 z-50 bg-primary w-full h-full">
          <div className="flex justify-end mt-2 me-4">
            <button onClick={handleToggleNav}>
              <AiOutlineClose className="text-2xl" />
            </button>
          </div>
          <NavContent />
        </div>
      )}
    </div>
  );
};

const DesktopNav = () => {
  const selectedTheme = useSelector((state) => state.theme);
  return (
    <div className="flex flex-col m-auto">
      <h1
        className={`text-2xl flex gap-4 items-center justify-center tracking-widest drop-shadow-md font-bold contrast-100`}
      >
        <span className=" filter-none">
          <FaMusic className={`text-${selectedTheme} `} />
        </span>
        <Link to={`/`} className="saturate-200">
          Jollify
        </Link>
      </h1>
      <NavContent />
    </div>
  );
};

const NavBar = () => {
  return (
    <>
      <nav className="text-white py-7">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <DesktopNav />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
