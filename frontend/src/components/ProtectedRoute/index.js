import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwt_token");
  const location = useLocation();

  const publicPaths = ["/login", "/signup"];

  // ✅ If token exists and trying to access login/signup again, redirect to home
  if (jwtToken && publicPaths.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  // ❌ If no token and trying to access protected routes, redirect to signup
  if (!jwtToken && !publicPaths.includes(location.pathname)) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
