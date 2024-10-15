import { Router } from "express";
import { addService, deleteService } from "../controller/serviceController.js";
import upload from "../middleware/upload.js";
const serviceRouter = Router();

serviceRouter.route("/add-service").post(upload, addService);

serviceRouter.route("/services/:id").delete(deleteService);

export default serviceRouter;
