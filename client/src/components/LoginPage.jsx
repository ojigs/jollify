import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMusic, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { loginSchema } from "../utils/schema";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const selectedTheme = useSelector((state) => state.theme);
  const [errors, setErrors] = useState({});
  // const location = useLocation();

  // Redirect user to page they were before request for authentication
  // const from = location?.state?.from;
  // console.log(from);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { error } = loginSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const validationErrors = {};
      error.details.forEach(
        (detail) => (validationErrors[detail.path[0]] = detail.message)
      );
      setErrors(validationErrors);
    }
  };

  return (
    <section className=" text-gray-100 h-full">
      <div className="flex flex-col justify-center h-full max-w-[768px] m-auto">
        <div className="mb-8">
          <span
            className={`text-xs flex gap-1 items-center mb-2 tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className="filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <span className="saturate-200">Jollify</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">Log in</h1>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0 p-1">
          <div className="sm:w-[45%] sm:pr-[10%]">
            <div className="provider flex items-center gap-4 rounded-md mb-2 p-2 bg-secondary-100 hover:bg-opacity-50 active:translate-y-[1px] transition-transform ease-in">
              <FaGoogle />
              <span>Log in with Google</span>
            </div>
            <div className="provider flex items-center gap-4 rounded-md mb-2 p-2 bg-secondary-100 hover:bg-opacity-50 active:translate-y-[1px] transition-transform ease-in">
              <FaTwitter />
              <span>Log in with Twitter</span>
            </div>
            <div className="provider flex items-center gap-4 rounded-md mb-2 p-2 bg-secondary-100 hover:bg-opacity-50 active:translate-y-[1px] transition-transform ease-in">
              <FaFacebook />
              <span>Log in with Facebook</span>
            </div>
          </div>
          <div className="sm:w-[0%]">
            <div className="flex items-center sm:flex-col  h-full">
              <span className="h-[2px] w-[2px] flex-grow bg-gray-400"></span>
              <span className="border-2 border-gray-400 p-2 rounded-lg">
                OR
              </span>
              <span className="h-[2px] w-[2px] flex-grow bg-gray-400"></span>
            </div>
          </div>
          <div className="sm:pl-[10%] sm:w-[55%]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {errors.username && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {errors.password && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className={`bg-${selectedTheme} hover:bg-${selectedTheme} active:translate-y-[1px] w-full text-white font-bold py-2 px-4 rounded`}
                >
                  Log in
                </button>
              </div>
              <div className="text-center">
                <span>New to Jollify?</span>{" "}
                <Link to={`/signup`} className="text-blue-300">
                  Sign up now!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
