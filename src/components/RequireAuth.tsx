import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "~contexts/AuthContext";
import { LOGIN_URL } from "~pages/routes";

const RequireAuth = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth.user) {
    return (
      <Navigate to={`/${LOGIN_URL}`} state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
