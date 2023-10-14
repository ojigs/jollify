import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, totalPages }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const getPageLink = (pageNumber) => `/explore?page=${pageNumber}`;

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <Link
            key={pageNumber}
            to={getPageLink(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? `bg-${selectedTheme} text-gray-200`
                : `text-${selectedTheme} bg-gray-200`
            } px-2 py-1 mr-4 rounded-md`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
