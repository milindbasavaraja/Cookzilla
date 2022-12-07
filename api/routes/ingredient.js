import express from "express";
import {
  addNewIngredients,
  getAllIngredients,
} from "../controller/ingredient-controller.js";

const router = express.Router();

router.get("/", getAllIngredients);

router.post("/new-ingredients", addNewIngredients);

export default router;
