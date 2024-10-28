import { Schema } from "mongoose";

const shortAboutSchema = Schema(
  {
    description: {
      en: {
        type: String,
      },
      np: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default shortAboutSchema;
