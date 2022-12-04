import express from "express";
import {
  getAllPostsForUser,
  getUserInfo,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/", getUserInfo);
router.get("/user-posts", getAllPostsForUser);

export default router;
