import React, { useContext, useEffect, useState } from "react";
import "./css/navbar.css";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "./Buttons/Button";
import NavBarLoggedInButtons from "./NavBarLoggedInButtons";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
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
              <option value="">--Please choose an option--</option>
              <option value="tags">Tags</option>
              <option value="ingredients">Ingredients</option>
              <option value="stars">Review Stars</option>
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
          <Link className="link" to="/my-profile">
            <span className="user-name">{currentUser?.userName}</span>
          </Link>

          {currentUser ? (
            <NavBarLoggedInButtons />
          ) : (
            <Link className="link" to="/log-in">
              <Button
                type={"button"}
                classNameProps={"btn btn-outline-primary login-button"}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
