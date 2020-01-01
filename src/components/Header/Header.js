import React from "react";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import classes from "./Header.module.css";

const Header = ({ loggedIn, logout }) => {
  const activeStyle = {
    borderBottom: "4px solid #555",
    backgroundColor: "rgb(185,160,127)"
  };
  return (
    <nav className={classes.Header}>
      <ul className={`${classes.content} container`}>
        <li className={classes.NavItem}>
          <NavLink exact activeStyle={activeStyle} className={classes.NavLink} to="/">
            Home
          </NavLink>
        </li>
        <li className={classes.NavItem}>
          <NavLink activeStyle={activeStyle} className={classes.NavLink} to="/news">
            News
          </NavLink>
        </li>
        {loggedIn ? (
          <li className={classes.NavItem}>
            <NavLink activeStyle={activeStyle} className={classes.NavLink} to="/profile">
              Profile
            </NavLink>
          </li>
        ) : null}

        {loggedIn ? (
          <li className={classes.NavItem}>
            <button className={classes.NavLink} onClick={e => logout()}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className={classes.NavItem}>
              <NavLink activeStyle={activeStyle} className={classes.NavLink} to="/login">
                Login
              </NavLink>
            </li>
            <li className={classes.NavItem}>
              <NavLink activeStyle={activeStyle} className={classes.NavLink} to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({ loggedIn: state.auth.userId });
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
