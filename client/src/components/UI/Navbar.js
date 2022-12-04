import React, { useContext } from "react";
import "./css/navbar.css";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container navbar">
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              className="logo-img"
              alt="Cookzilla - Share your recipies"
            />
          </Link>
        </div>
        <div className="links">
          <span className="user-name">{currentUser?.username}</span>
          {currentUser ? (
            <button type="button" className="btn btn-outline-danger">
              Logout
            </button>
          ) : (
            <Link className="link" to="/log-in">
              <button type="button" className="btn btn-outline-primary">
                Login
              </button>
            </Link>
          )}
          {currentUser && (
            <span className="navbar-write">
              <Link className="link-write" to="/write">
                Create Post
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
