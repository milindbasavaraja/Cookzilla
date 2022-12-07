import React from "react";

const Dropdown = () => {
  const onClickItemHandler = (event) => {
    console.log(event.target.innerHTML);
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-danger dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Action
      </button>
      <ul className="dropdown-menu">
        <li>
          <span className="dropdown-item" onClick={onClickItemHandler}>
            Action
          </span>
        </li>
        <li>
          <span className="dropdown-item" onClick={onClickItemHandler}>
            Another action
          </span>
        </li>
        <li>
          <span className="dropdown-item" onClick={onClickItemHandler}>
            Something else here
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
