import express from "express";
import {
  addPost,
  addRecipeIngredients,
  addRecipePhotos,
  addRecipeSteps,
  addRecipeTags,
  addReview,
  addReviewPhoto,
  deletePostById,
  getAllPosts,
  getAllReviewsForRecipeID,
  getAllReviewsPhotosForRecipeID,
  getAllStepsById,
  getAllTags,
  getAllTagsById,
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
router.get("/reviews/:id", getAllReviewsForRecipeID);
router.get("/reviews/photos/:id", getAllReviewsPhotosForRecipeID);
router.get("/tags/:id", getAllTagsById);

router.post("/", addPost);
router.post("/images", addRecipePhotos);
router.post("/add-tags", addRecipeTags);
router.post("/add-steps", addRecipeSteps);
router.post("/ingredients", addRecipeIngredients);
router.post("/reviews/pictures", addReviewPhoto);
router.post("/reviews/", addReview);

router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);

export default router;
