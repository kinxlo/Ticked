import React from "react";
import { NavLink } from "react-router-dom";
import style from "./navbar.module.scss";
import { useContext} from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";

const Links = ({ isMobile }) => {
  const { user } = useContext(AuthContext)
  return (
    <div
      className={[style.links, isMobile ? null : style.navbarLink].join(" ")}
    >
      <NavLink
        to={`/how-it-works`}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        How it works
      </NavLink>
      <NavLink
        to={`/about`}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        About Us
      </NavLink>
      <NavLink
        to={`/contact`}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        Contact Us
      </NavLink>
      <NavLink
        to={`/subscribe`}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        Subscription Plan
      </NavLink>
      
      { user ? <NavLink
        to={`/dashboard`}
        className={({ isActive }) => (isActive ? style.active : style.inactive)}
      >
        Dashboard
      </NavLink> : null }
    </div>
  );
};

export default Links;
