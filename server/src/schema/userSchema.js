import { Schema } from "mongoose";

const userSchema = Schema(
  {
    userName: {
      type: String,
      required: [true, "userName field is required."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password field is required."],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superAdmin"],
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
