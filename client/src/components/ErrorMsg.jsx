import { BiErrorCircle } from "react-icons/bi";

const ErrorMsg = ({ error }) => {
  return (
    <div className="text-gray-100 h-full flex flex-col gap-2 justify-center items-center">
      <BiErrorCircle className="text-red-500 text-3xl" />
      <h1 className="text-lg">An error has occured</h1>
      <p className="text-gray-400">{error?.data?.message}</p>
    </div>
  );
};

export default ErrorMsg;
