import express from "express";
import {
  createEventForGroup,
  getEventDetails,
  getEventDetailsForAGivenNameAndCretor,
  getEventPhotos,
  registerForEvent,
  uploadPicturesForEvent,
} from "../controller/event-controller.js";

const router = express.Router();

router.post("/", createEventForGroup);
router.post("/rsvp/", registerForEvent);
router.post("/pictures", uploadPicturesForEvent);

router.get("/get-all-events/:name", getEventDetailsForAGivenNameAndCretor);
router.get("/get-event/:id", getEventDetails);
router.get("/pictures/:id", getEventPhotos);

export default router;
