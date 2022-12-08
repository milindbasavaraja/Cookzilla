//import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getAllIngredients = (req, res) => {
  const getAllIngredientQueries = "SELECT iName FROM Ingredient";

  db.query(getAllIngredientQueries, [], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data);
  });
};

export const addNewIngredients = (req, res) => {
  const insertNewIngredients =
    "INSERT INTO Ingredient (`iName`,`purchaseLink`) VALUES ?";
  let ingredients = [];
  req.body.ingredients.map((ingredient) => {
    ingredients.push([ingredient.iName, ingredient.purchaseLink]);
  });
  console.log(ingredients);
  db.query(insertNewIngredients, [ingredients], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data);
  });
};
