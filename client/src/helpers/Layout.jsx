import { Outlet } from "react-router-dom";
import AlertPop from "./AlertPop";

const Layout = () => {
  return (
    <>
      <Outlet />
      <AlertPop />
    </>
  );
};

export default Layout;
