import { Router } from "express";
import {
  addAboutSection,
  deleteAboutSection,
  getAboutSection,
  updateAboutSection,
} from "../controller/shortAboutController.js";

const shortAboutRouter = Router();

shortAboutRouter.route("/").post(addAboutSection).get(getAboutSection);
shortAboutRouter
  .route("/:id")
  .patch(updateAboutSection)
  .delete(deleteAboutSection);

export default shortAboutRouter;
