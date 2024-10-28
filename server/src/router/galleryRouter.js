import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addImage,
  deleteImage,
  getImage,
} from "../controller/galleryController.js";

const galleryRouter = Router();

galleryRouter.route("/").post(upload.single("image"), addImage).get(getImage);
galleryRouter.route("/:id").delete(deleteImage);

export default galleryRouter;
