import { createContext, useMemo, useState } from "react";
import axios from "~common/axiosConfig";

export interface User {}

interface AuthContextValue {
  /** Null implies the user is not logged in. */
  user: User | null;
  setUser: (context: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

const AuthContextProvider = (props: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout: () => {
        axios.get("/logout").then(() => {
          setUser(null);
        });
      },
    }),
    [user, setUser]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
