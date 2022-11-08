import React from "react";
import { NavLink } from "react-router-dom";

const navLinkStyle = "p-3 py-1 rounded";

const MyNavLink = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? navLinkStyle + " bg-blue-100" : navLinkStyle
      }
    >
      {children}
    </NavLink>
  );
};

export default MyNavLink;
