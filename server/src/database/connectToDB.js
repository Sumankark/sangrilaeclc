import mongoose from "mongoose";
import { databaseLink } from "../../config.js";

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(databaseLink);
    console.log(
      `Application is connected to mongodb database successfully at ${databaseLink}`
    );
  } catch (error) {
    console.log("Failed to connect to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
