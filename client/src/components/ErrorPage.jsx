import { Link, useRouteError } from "react-router-dom";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const error = useRouteError();
  if (error) {
    console.log(error);
  }

  return (
    <>
      <main className="grid min-h-full place-items-center bg-secondary-200 text-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold ">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 ">
            {error
              ? `${error.statusText || error.message || error.error}`
              : "Sorry, we couldn’t find the page you’re looking for."}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/home"
              className={`rounded-md bg-${selectedTheme} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink`}
            >
              Go back home
            </Link>
            <Link
              to="mailTo:ojighoroemmanuel&#64;gmail&#46;com?subject=Support Request&body=Please describe your issue here."
              className="text-sm font-semibold "
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
