import express from "express";
import { getEventDetailsForAGivenNameAndCretor } from "../controller/event-controller.js";

const router = express.Router();

router.get("/get-all-events/:name", getEventDetailsForAGivenNameAndCretor);

export default router;
