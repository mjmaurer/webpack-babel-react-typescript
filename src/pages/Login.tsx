import { FormEvent, useContext, useState, useEffect, useCallback } from "react";
import axios from "~common/axiosConfig";
import { AuthContext, User } from "~contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Displays a login screen and updates AuthContext and redirects to previous route
 * on a successful login.
 *
 * It will also attempt to login using stored credentials when the component is mounted.
 */
const Login = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const processUser = useCallback(
    (userResult: any) => {
      const user = userResult as User;
      setUser(user);
      // Return to user location before redirect
      const navTo = (location.state as { from: string } | null)?.from || `/`;
      navigate(navTo, { replace: true });
    },
    [setUser, navigate, location]
  );

  // Attempt auto-login using stored session cookie
  useEffect(() => {
    axios
      .get("/user/")
      .then((res) => {
        processUser(res.data.user);
      })
      .catch(() => setAutoLoginAttempted(true));
  }, [processUser]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginFailed(false);
    const data = new FormData(event.currentTarget);
    axios
      .post("/api/login/", {
        email: data.get("email") as string,
        password: data.get("password") as string,
      })
      .then((res) => {
        processUser(res.data.user);
      })
      .catch((res) => setLoginFailed(true));
  };

  if (!autoLoginAttempted) {
    // Return nothing to avoid flash of login screen
    return <div />;
  }

  return <div>Login</div>;
};

export default Login;
