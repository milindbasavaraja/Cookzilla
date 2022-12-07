import express from "express";
import { getAllUnits } from "../controller/unit-controller.js";

const router = express.Router();

router.get("/", getAllUnits);

export default router;
