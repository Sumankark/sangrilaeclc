import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../controller/addressController.js";

const addressRouter = Router();

addressRouter.route("/").post(addAddress).get(getAddress);
addressRouter.route("/:id").patch(updateAddress).delete(deleteAddress);

export default addressRouter;
