import React, { useContext, useEffect, useState } from "react";
import "./css/navbar.css";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");

  useEffect(() => {
    setCategory("");
    setSearchCriteria("");
  }, []);

  const onHandleSelect = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const onHandleSearchHandler = (event) => {
    setSearchCriteria(event.target.value);
  };

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
        <div className="navbar-search-bar">
          <div className="navbar-search-bar-dropdown">
            <select
              name="categories"
              id="category-select"
              className="navbar-category-select"
              onChange={onHandleSelect}
            >
              <option value="" onChange={onHandleSelect}>
                --Please choose an option--
              </option>
              <option value="tags" onChange={onHandleSelect}>
                Tags
              </option>
              <option value="ingredients" onChange={onHandleSelect}>
                Ingredients
              </option>
              <option value="stars" onChange={onHandleSelect}>
                Review Stars
              </option>
            </select>
          </div>
          <div className="navbar-search-input">
            <input
              className="navbar-content-input"
              type="text"
              name=""
              value={searchCriteria}
              placeholder={`Search ${category}`}
              onChange={onHandleSearchHandler}
            />
          </div>

          <Link className="link" to={`/?${category}=${searchCriteria}`}>
            <button type="button" className="btn btn-info">
              Search
            </button>
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
