import express from "express";
import { login, logout, register } from "../controller/auth-controller.js";
import {
  addNewGroup,
  getAllNonJoinedGroups,
  joinGroup,
} from "../controller/group-controller.js";

const router = express.Router();

router.post("/", addNewGroup);
router.get("/", getAllNonJoinedGroups);
router.post("/join-group", joinGroup);

export default router;
