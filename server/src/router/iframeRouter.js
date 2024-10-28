import { Router } from "express";
import {
  addIframe,
  deleteIframe,
  getIframe,
  updateIframe,
} from "../controller/iframeController.js";

const iframeRouter = Router();

iframeRouter.route("/").post(addIframe).get(getIframe);
iframeRouter.route("/:id").patch(updateIframe).delete(deleteIframe);

export default iframeRouter;
