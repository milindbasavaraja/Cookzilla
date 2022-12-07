import express from "express";
import {
  addPost,
  addRecipeIngredients,
  addRecipePhotos,
  addRecipeSteps,
  addRecipeTags,
  deletePostById,
  getAllPosts,
  getAllStepsById,
  getAllTags,
  getLatestRecipeID,
  getPostById,
  updatePostById,
} from "../controller/post-controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/tags", getAllTags);
router.get("/lastest-recipeId", getLatestRecipeID);
router.get("/:id", getPostById);
router.get("/steps/:id", getAllStepsById);

router.post("/", addPost);
router.post("/images", addRecipePhotos);
router.post("/add-tags", addRecipeTags);
router.post("/add-steps", addRecipeSteps);
router.post("/ingredients", addRecipeIngredients);

router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);

export default router;
