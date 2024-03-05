import { Outlet } from "react-router-dom";
import classes from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
};
