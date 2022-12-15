import express from "express";
import { login, logout, register } from "../controller/auth-controller.js";
import {
  addNewGroup,
  getAllJoinedGroups,
  getAllNonJoinedGroups,
  getGroupDetailsForAGivenNameAndCretor,
  joinGroup,
} from "../controller/group-controller.js";

const router = express.Router();

router.post("/", addNewGroup);
router.get("/", getAllNonJoinedGroups);
router.get("/all-joined-groups", getAllJoinedGroups);

router.get("/get-group-details/:name", getGroupDetailsForAGivenNameAndCretor);
router.post("/join-group", joinGroup);

export default router;
