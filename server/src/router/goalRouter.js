import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  addGoal,
  deletedGoal,
  getGoal,
  updateGoal,
} from "../controller/goalController.js";

const goalRouter = Router();

goalRouter.route("/").post(upload.single("image"), addGoal).get(getGoal);
goalRouter
  .route("/:id")
  .patch(upload.single("image"), updateGoal)
  .delete(deletedGoal);

export default goalRouter;
