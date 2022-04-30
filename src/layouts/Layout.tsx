import { ReactElement, useContext, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "~contexts/AuthContext";
import styles from "./Layout.scss";

const drawerWidth = 250;

interface DashboardLayoutProps {}

const Layout = (props: DashboardLayoutProps): ReactElement => {
  const { pathname } = useLocation();
  const { logout, user } = useContext(AuthContext);

  return (
    <main className={styles.layout}>
      <Outlet />
    </main>
  );
};

export default Layout;
