import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addCarousel,
  deleteCarousel,
  getCarousel,
  updateCarousel,
} from "../controller/carouselController.js";

const carouselRouter = Router();

carouselRouter.route("/").post(upload.single("image"), addCarousel);
carouselRouter.route("/").get(getCarousel);
carouselRouter.route("/:id").patch(upload.single("image"), updateCarousel);
carouselRouter.route("/:id").delete(deleteCarousel);
export default carouselRouter;
