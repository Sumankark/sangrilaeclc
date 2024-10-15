import express, { json } from "express";
import cors from "cors";
import { port } from "./config.js";
import userRouter from "./src/router/userRouter.js";
import connectToMongoDB from "./src/database/connectToDB.js";
import carouselRouter from "./src/router/carouselRouter.js";

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
