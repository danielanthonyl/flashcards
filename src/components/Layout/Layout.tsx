import { Outlet,useLocation, useNavigate } from "react-router-dom";
import classes from "./Layout.module.css";
import { useEffect } from "react";

export const Layout = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    if(pathname === '/'){
      navigate("/decks");
    }

  },[pathname, navigate])

  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
};
