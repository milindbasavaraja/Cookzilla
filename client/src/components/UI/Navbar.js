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
          <span className="user-name">{currentUser?.userName}</span>

          {currentUser ? (
            <button
              type="button"
              className="btn btn-outline-danger logout-button"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link className="link" to="/log-in">
              <button
                type="button"
                className="btn btn-outline-primary login-button"
              >
                Login
              </button>
            </Link>
          )}
          {currentUser && (
            <Link className="link-write" to="/write">
              <button
                type="button"
                className="btn btn-outline-info create-post-button"
              >
                Create Post
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
