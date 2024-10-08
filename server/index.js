import express, { json } from "express";
import cors from "cors";
import { port } from "./config.js";
import userRouter from "./src/router/userRouter.js";
import connectToMongoDB from "./src/database/connectToDB.js";

const expressApp = express();

expressApp.listen(port, () => {
  console.log(`Express application is listen at the port ${port}`);
});

connectToMongoDB();

expressApp.use(json());
expressApp.use(cors());

expressApp.use("/", userRouter);
