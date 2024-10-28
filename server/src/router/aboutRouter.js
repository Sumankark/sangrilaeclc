import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addAboutSection,
  deleteAboutSection,
  getAboutSection,
  updateAboutSection,
} from "../controller/aboutController.js";

const aboutRouter = Router();

aboutRouter
  .route("/")
  .post(upload.single("image"), addAboutSection)
  .get(getAboutSection);
aboutRouter
  .route("/:id")
  .patch(upload.single("image"), updateAboutSection)
  .delete(deleteAboutSection);

export default aboutRouter;
