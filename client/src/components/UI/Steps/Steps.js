import React, { useState } from "react";

import CourseGoalList from "../../CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "../../CourseGoals/CourseInput/CourseInput";

import "./Steps.css";

const Steps = (props) => {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = (enteredText) => {
    console.log("Text entered", enteredText);
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({
        text: enteredText.text,
        id: Math.random().toString(),
        ingredientUnit: enteredText.ingredientUnit,
        quantity: enteredText.quantity,
        purchaseLink: enteredText.purchaseLink,
      });
      return updatedGoals;
    });
  };

  const onSubmitGoalHandler = () => {
    console.log("IN Steps");
    props.onStepsSubmitted(courseGoals);
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: "center" }}>No Steps Added. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput
          onAddGoal={addGoalHandler}
          onSubmitGoal={onSubmitGoalHandler}
          buttonTitle={props.buttonTitle}
          submitTitle={props.submitTitle}
          labelTitle={props.labelTitle}
          displayUnitButton={props.displayUnitButton}
          placeholder={props.placeholder}
        />
      </section>
      <section id="goals">{content}</section>
    </div>
  );
};

export default Steps;
