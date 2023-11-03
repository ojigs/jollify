import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Pagination = ({ path, currentPage, totalPages }) => {
  const selectedTheme = useSelector((state) => state.theme);
  const getPageLink = (pageNumber) => `${path}?page=${pageNumber}`;

  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <Link
            key={pageNumber}
            to={getPageLink(pageNumber)}
            className={`text-gray-200 ${
              pageNumber !== currentPage && ` bg-${selectedTheme}`
            } px-2 py-1 text-sm mr-2 md:text-base md:mr-4 rounded-md`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
