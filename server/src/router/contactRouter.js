import { Router } from "express";
import {
  addContact,
  deleteContact,
  getContact,
  updateContact,
} from "../controller/contactController.js";

const contactRouter = Router();

contactRouter.route("/").post(addContact).get(getContact);
contactRouter.route("/:id").patch(updateContact).delete(deleteContact);

export default contactRouter;
