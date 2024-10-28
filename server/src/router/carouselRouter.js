import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
  updateCarousel,
} from "../controller/carouselController.js";

const carouselRouter = Router();

carouselRouter
  .route("/")
  .post(upload.single("image"), addCarousel)
  .get(getCarousel);
carouselRouter
  .route("/:id")
  .patch(upload.single("image"), updateCarousel)
  .delete(deleteCarousel);
export default carouselRouter;
