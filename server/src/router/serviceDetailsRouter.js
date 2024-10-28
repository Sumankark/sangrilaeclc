// serviceDetailRouter.js
import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  createServiceDetail,
  deleteServiceDetail,
  editServiceDetail,
  getServiceDetails,
} from "../controller/serviceDetailsController.js";

const serviceDetailRouter = Router();

// Route for service details
serviceDetailRouter
  .route("/:serviceId")
  .post(upload.single("image"), createServiceDetail)
  .get(getServiceDetails);

serviceDetailRouter
  .route("/:id")
  .patch(upload.single("image"), editServiceDetail)
  .delete(deleteServiceDetail);

export default serviceDetailRouter;
