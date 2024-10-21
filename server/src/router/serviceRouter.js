import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  createService,
  deleteService,
  editService,
  getService,
} from "../controller/serviceController.js";

const serviceRouter = Router();

serviceRouter.route("/").post(upload.single("image"), createService);
serviceRouter.route("/").get(getService);
serviceRouter.route("/:id").patch(editService);
serviceRouter.route("/:id", deleteService);

export default serviceRouter;
