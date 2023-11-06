import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterUserMutation } from "./authApiSlice";
import { FaMusic } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUpSchema } from "../../utils/schema";
import { Helmet } from "react-helmet-async";
import ReCAPTCHA from "react-google-recaptcha";
const sitekey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const SignupPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const location = useLocation();
  const [signUp, { isLoading, isError, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef();

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
      return;
    }

    try {
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      const { error } = await signUp({ ...formData, recaptchaToken });
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
      <Helmet prioritizeSeoTags>
        <title>{`Sign up - Jollify`}</title>
        <link rel="canonical" href={`https://jollify.vercel.app/signup`} />
        <meta
          name="description"
          content={`Sign up to enjoy exclusive content and features on Jollify. Discover new music, create playlists, and connect with other music lovers. Our secure sign-up process ensures that your personal information is protected.`}
        />
        <meta property="og:title" content="Sign up - Jollify" />
        <meta
          property="og:url"
          content={`https://jollify-server.vercel.app/signup`}
        />
        <meta
          property="og:description"
          content={`Sign up to enjoy exclusive content and features on Jollify. Discover new music, create playlists, and connect with other music lovers. Our secure sign-up process ensures that your personal information is protected.`}
        />
        <meta name="twitter:title" content="Sign up - Jollify" />
        <meta
          name="twitter:description"
          content="Sign up to enjoy exclusive content and features on Jollify. Discover new music, create playlists, and connect with other music lovers. Our secure sign-up process ensures that your personal information is protected."
        />
      </Helmet>
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
                <div className="relative w-full rounded-md">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                    required
                  />
                  <div
                    className="absolute right-2 top-1/3 text-black text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEye className="text-gray-900" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-gray-500" />
                    )}
                  </div>
                </div>
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
                      : `bg-opacity-50 cursor-not-allowed`
                  } w-full text-white font-bold py-2 px-4 rounded`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                  ) : (
                    `Sign up`
                  )}
                </button>
                <div className="text-xs mt-2">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-blue-300 hover:decoration-blue-300 hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    className="text-blue-300 hover:decoration-blue-300 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </div>
                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message ||
                      error?.data?.error?.details[0].message}
                  </span>
                )}
                <div className="mt-2 text-xs">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={sitekey}
                    size="invisible"
                    theme="dark"
                  />
                </div>
              </div>
              <div className="text-center">
                <span>Already have an account?</span>{" "}
                <Link
                  to={{
                    pathname: `/login`,
                    state: { from: location.pathname },
                  }}
                  className={`text-${selectedTheme}-50`}
                >
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
