import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Protected({ children, authentication = true }) {
  const user = useSelector((state) => state.user);

  if (authentication && !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default Protected;
