import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "~layouts/Layout";
import { ADMIN_URL_ROOT, LOGIN_URL } from "~pages/routes";

import RequireAuth from "~components/RequireAuth";
import { AuthContextProvider } from "~contexts/AuthContext";
import Login from "~pages/Login";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={`/${LOGIN_URL}`} element={<Login />} />
          <Route path={`/${ADMIN_URL_ROOT}`} element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route index element={<div>Admin Home</div>} />
              </Route>
            </Route>
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Home</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
