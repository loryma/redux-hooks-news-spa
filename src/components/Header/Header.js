import React from "react";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import classes from "./Header.module.css";

const Header = ({ loggedIn, logout }) => {
  const activeStyle = {
    borderBottom: "2px solid slateblue"
  };
  return (
    <nav>
      <ul className={classes.Header}>
        <li className={classes.NavItem}>
          <NavLink
            exact
            activeStyle={activeStyle}
            className={classes.NavLink}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={classes.NavItem}>
          <NavLink
            activeStyle={activeStyle}
            className={classes.NavLink}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li className={classes.NavItem}>
          <NavLink
            activeStyle={activeStyle}
            className={classes.NavLink}
            to="/Profile"
          >
            Profile
          </NavLink>
        </li>
        <li className={classes.NavItem}>
          {loggedIn ? (
            <button className={classes.NavLink} onClick={e => logout()}>
              Logout
            </button>
          ) : (
            <NavLink
              activeStyle={activeStyle}
              className={classes.NavLink}
              to="Login"
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = state => ({ loggedIn: state.auth.userId });
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
