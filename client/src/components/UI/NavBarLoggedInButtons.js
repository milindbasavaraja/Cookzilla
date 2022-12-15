import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "./Buttons/Button";

const NavBarLoggedInButtons = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="nav-bar-log-in-buttons">
      <Link to="/write">
        <Button type={"button"} classNameProps={"btn btn-outline-info"}>
          Create Post
        </Button>
      </Link>

      <Link to="/groups">
        <Button type={"button"} classNameProps={"btn btn-outline-info"}>
          Groups
        </Button>
      </Link>

      <Button
        type={"button"}
        classNameProps={"btn btn-outline-danger"}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default NavBarLoggedInButtons;
