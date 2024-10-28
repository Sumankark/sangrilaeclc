import express, { json } from "express";
import cors from "cors";
import { port } from "./config.js";
import userRouter from "./src/router/userRouter.js";
import connectToMongoDB from "./src/database/connectToDB.js";
import carouselRouter from "./src/router/carouselRouter.js";
import goalRouter from "./src/router/goalRouter.js";
import galleryRouter from "./src/router/galleryRouter.js";
import serviceRouter from "./src/router/serviceRouter.js";
import volunteeringRouter from "./src/router/volunteeringRouter.js";
import aboutRouter from "./src/router/aboutRouter.js";
import serviceDetailRouter from "./src/router/serviceDetailsRouter.js";
import shortAboutRouter from "./src/router/shortAboutRouter.js";
import contactRouter from "./src/router/contactRouter.js";
import addressRouter from "./src/router/addressRouter.js";
import iframeRouter from "./src/router/iframeRouter.js";

const expressApp = express();

expressApp.listen(port, () => {
  console.log(`Express application is listen at the port ${port}`);
});

connectToMongoDB();

expressApp.use(express.static("public"));

expressApp.use(json());
expressApp.use(cors());

expressApp.use("/", userRouter);
expressApp.use("/carousel", carouselRouter);
expressApp.use("/goal", goalRouter);
expressApp.use("/gallery", galleryRouter);
expressApp.use("/service", serviceRouter);
expressApp.use("/service-details", serviceDetailRouter);
expressApp.use("/volunteering", volunteeringRouter);
expressApp.use("/about", aboutRouter);
expressApp.use("/short-about", shortAboutRouter);
expressApp.use("/contact", contactRouter);
expressApp.use("/address", addressRouter);
expressApp.use("/iframe", iframeRouter);
