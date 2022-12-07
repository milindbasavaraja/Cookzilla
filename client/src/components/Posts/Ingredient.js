import React, { useEffect, useState } from "react";

import Steps from "../UI/Steps/Steps";
import "./css/ingredient.css";

const Ingredient = (props) => {
  

  const onAllIngrdientsSubmitted = (stepGoals) => {
    props.onStepsSubmitted(stepGoals);
  };

 

  return (
    <div className="create-post-ingrdient">
      <div className="create-post-ingrdient-title">
        <h5>Select Applicable Ingrdients</h5>
      </div>
      <div className="create-post-ingrdient-content">
        <Steps
          onStepsSubmitted={onAllIngrdientsSubmitted}
          buttonTitle={"Add Ingredient"}
          submitTitle={"Submit All Ingredients"}
          labelTitle={"Recipe Ingrdients"}
          displayUnitButton={true}
          placeholder={"Enter Ingredient"}
        />
      </div>
    </div>
  );
};

export default Ingredient;
