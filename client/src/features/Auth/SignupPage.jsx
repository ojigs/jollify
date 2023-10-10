import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "./authApiSlice";
import { FaMusic } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUpSchema } from "../../utils/schema";

const SignupPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [signUp, { isLoading, isError, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = signUpSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(
        (detail) => (errors[detail.path[0]] = detail.message)
      );
      setValidationErrors(errors);
    }

    try {
      const { error } = await signUp(formData);
      if (error) {
        console.error(error);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className=" text-gray-100 h-full">
      <div className="flex flex-col justify-center h-full max-w-[450px] m-auto">
        <div className="mb-8">
          <span
            className={`text-xs flex gap-1 items-center mb-2 tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className=" filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <span className="saturate-200">Jollify</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">Sign up</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 p-1">
          <div className="email flex-grow">
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
                {validationErrors.username && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.username}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {validationErrors.email && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.email}
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
                {validationErrors.password && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.password}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className={`bg-${selectedTheme} ${
                    !isLoading
                      ? `hover:bg-${selectedTheme}-50 active:translate-y-[1px]`
                      : `bg-opacity-50`
                  } w-full text-white font-bold py-2 px-4 rounded`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                  ) : (
                    `Sign up`
                  )}
                </button>
                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message}
                  </span>
                )}
              </div>
              <div className="text-center">
                <span>Already have an account?</span>{" "}
                <Link to={`/login`} className="text-blue-300">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
