import axios from "axios";
import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const [ingredientSelected, setIngredientSelected] =
    useState("Select Ingredient");
  const [availableIngredients, setAvailableIngredients] = useState([]);

  useEffect(() => {
    props.onSelect(ingredientSelected);
  }, [ingredientSelected, props]);

  const onClickItemHandler = (event) => {
    console.log(event.target.innerHTML);
    setIngredientSelected(event.target.innerHTML);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/ingredients`);
        setAvailableIngredients(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ marginBottom: "10px" }}
      >
        {ingredientSelected}
      </button>
      <ul className="dropdown-menu">
        {availableIngredients.map((ingredient, index) => {
          return (
            <li key={index}>
              <span className="dropdown-item" onClick={onClickItemHandler}>
                {ingredient.iName}
              </span>
            </li>
          );
        })}
        <li key={"new-index"}>
          <span className="dropdown-item" onClick={onClickItemHandler}>
            New Ingredient
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
