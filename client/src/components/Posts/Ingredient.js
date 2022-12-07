import React from "react";
import Dropdown from "../UI/Dropdown";

const Ingredient = () => {
  return (
    <div className="create-post-ingrdient">
      <div className="create-post-ingrdient-title">
        <h5>Select Applicable Ingrdients</h5>
      </div>
      <div className="create-post-ingredient-details">
        <input
          type="checkbox"
          name=""
          value="Other"
          id="create-post-tags-checkbox"
        />
        <label
          htmlFor="create-post-tags-checkbox"
          className="create-post-tags-checkbox-tag"
        >
          Other
        </label>
        <Dropdown />
      </div>
    </div>
  );
};

export default Ingredient;
