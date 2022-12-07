import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Buttons/Button";
import Dropdown from "../../UI/UnitDropDown";
import IngredientDropdown from "../../UI/IngredientsDropdown";
import "./CourseInput.css";

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [unitSelected, setUnitSelected] = useState("");
  const [ingredientSelected, setIngredientSelected] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredPurchaseLink, setEnteredPurchaseLink] = useState("");
  const [displayTextBox, setDisplayTextBox] = useState(true);

  useEffect(() => {
    if (props.displayUnitButton) {
      setDisplayTextBox(false);
    }
  }, []);

  const onSelectHandler = (selectedUnit) => {
    console.log("In CourseInput ", selectedUnit);
    if (selectedUnit !== "Select Unit") {
      console.log("Setting unit");
      setUnitSelected(selectedUnit);
    }
  };

  const onSelectIngredientHandler = (selectedIngredient) => {
    console.log("In CourseInput ", selectedIngredient);
    if (selectedIngredient === "New Ingredient") {
      setDisplayTextBox(true);
    } else if (selectedIngredient !== "Select Ingredient") {
      console.log("Setting Ingredient");
      setIngredientSelected(selectedIngredient);
    }
  };

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      console.log("Setting to true");
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const quantityInputChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  const purchaseLinkInputChangeHandler = (event) => {
    setEnteredPurchaseLink(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      enteredValue.trim().length === 0 &&
      ingredientSelected.trim().length === 0
    ) {
      setIsValid(false);
      return;
    }
    if (props.displayUnitButton) {
      console.log("The deata is: ", {
        text: `${
          ingredientSelected.trim().length === 0
            ? enteredValue
            : ingredientSelected
        }`,
        ingredientUnit: unitSelected,
        quantity: enteredQuantity,
      });
      props.onAddGoal({
        text: `${
          ingredientSelected.trim().length === 0
            ? enteredValue
            : ingredientSelected
        }`,
        ingredientUnit: unitSelected,
        quantity: enteredQuantity,
        purchaseLink: enteredPurchaseLink,
      });
    } else {
      props.onAddGoal({ text: enteredValue });
    }

    setEnteredValue("");
    setEnteredQuantity("");
    if (props.displayUnitButton) {
      setDisplayTextBox(false);
    }

    setIngredientSelected("");
    setEnteredPurchaseLink("");
  };

  const onSubmitAllHandler = () => {
    console.log("IN CourseInput");
    props.onSubmitGoal();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label className="course-input-form-label">{props.labelTitle}</label>
      <div className={`form-control${props.displayUnitButton ? "-steps" : ""}`}>
        {!displayTextBox && (
          <IngredientDropdown onSelect={onSelectIngredientHandler} />
        )}
        <input
          type={displayTextBox ? "text" : "hidden"}
          onChange={goalInputChangeHandler}
          value={enteredValue}
          className={`form-control-input${
            props.displayUnitButton ? "-steps" : ""
          }`}
          placeholder={props.placeholder}
        />
        {displayTextBox && props.displayUnitButton && (
          <input
            type="text"
            onChange={purchaseLinkInputChangeHandler}
            className={`form-control-input${
              props.displayUnitButton ? "-steps" : ""
            }`}
            placeholder="Enter Purchase Link"
          />
        )}
        {props.displayUnitButton && (
          <div className="form-control-input-ingredients">
            <input
              type="text"
              onChange={quantityInputChangeHandler}
              value={enteredQuantity}
              className={`form-control-input${
                props.displayUnitButton ? "-steps" : ""
              }`}
              placeholder="Enter Quantity"
            />
            <Dropdown onSelect={onSelectHandler} />
          </div>
        )}
      </div>
      <div className="course-input-buttons">
        <Button type="submit" classNameProps={"btn btn-outline-success"}>
          {props.buttonTitle}
        </Button>

        <Button
          type="button"
          onClick={onSubmitAllHandler}
          classNameProps="btn btn-success"
        >
          {props.submitTitle}
        </Button>
      </div>
    </form>
  );
};

export default CourseInput;
