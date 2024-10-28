import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  createService,
  deleteService,
  editService,
  getService,
  getSpecificService,
} from "../controller/serviceController.js";

const serviceRouter = Router();

serviceRouter
  .route("/")
  .post(upload.single("image"), createService)
  .get(getService);

serviceRouter
  .route("/:id")
  .get(getSpecificService)
  .patch(upload.single("image"), editService)
  .delete(deleteService);

export default serviceRouter;
