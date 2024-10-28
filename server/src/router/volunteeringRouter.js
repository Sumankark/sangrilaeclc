import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addVolunteering,
  deletedVolunteering,
  getVolunteering,
  updateVolunteering,
} from "../controller/volunteeringController.js";

const volunteeringRouter = Router();

volunteeringRouter
  .route("/")
  .post(upload.single("image"), addVolunteering)
  .get(getVolunteering);
volunteeringRouter
  .route("/:id")
  .patch(upload.single("image"), updateVolunteering)
  .delete(deletedVolunteering);

export default volunteeringRouter;
