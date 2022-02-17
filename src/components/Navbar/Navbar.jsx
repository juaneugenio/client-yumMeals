/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav className="nav__authLinks">
      <Link to={PATHS.HOME_PAGE} className="nav__projectName">
        {CONSTS.CAPITALIZED_APP}
      </Link>

      <div>
        {props.user ? (
          <>
            <Row>Hello {props.user.username} !</Row>
            <Link to={PATHS.CURRENT_USER_PROFILE} className="authLink">
              Profile
            </Link>
            <Link to={PATHS.CREATE_RECIPE_PAGE} className="authLink">
              Create Recipe
            </Link>
            {/* <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link> */}
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUP_PAGE} className="authLink">
              Signup
            </Link>
            <Link to={PATHS.LOGIN_PAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
