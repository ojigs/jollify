import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleLoginModal } from "../app/modalSlice";

const LoginModal = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const { isLoginModal } = useSelector((state) => state.modal);
  const { message } = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    closeModal();
    navigate("/login");
  };

  const closeModal = () => {
    dispatch(toggleLoginModal());
  };

  return (
    <>
      {isLoginModal && (
        <div className="fixed z-10 inset-0 text-gray-800 overflow-y-auto backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-gray-200 w-96 rounded-lg shadow-lg">
              <div className="absolute top-0 right-0 pt-2 pr-4">
                <button
                  onClick={closeModal}
                  className="text-gray-800 hover:text-gray-200 hover:bg-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-xl font-semibold mb-6">Not Logged in?</h2>
                <p className="mb-6">Login to {message}</p>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 text-gray-800 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleClick}
                    className={`bg-${selectedTheme} hover:bg-${selectedTheme} text-white font-bold py-2 px-4 rounded`}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
