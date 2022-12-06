import express from "express";
import {
  addPost,
  addRecipePhotos,
  addRecipeSteps,
  addRecipeTags,
  deletePostById,
  addReview,
  addReviewPhoto,
  //updateReviewById,
  //deleteReviewById,
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
router.delete("/:id", deletePostById);
router.put("/:id", updatePostById);
router.post("/images/review", addReviewPhoto);
router.post("/:id/review",addReview);
// router.delete("/:id/review", deletePostById);
// router.put("/:id/review", updatePostById);

export default router;
