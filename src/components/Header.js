import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="Login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
