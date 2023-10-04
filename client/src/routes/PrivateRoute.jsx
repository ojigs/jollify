import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated ? <Component /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
