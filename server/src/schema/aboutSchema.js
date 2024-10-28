import { Schema } from "mongoose";

const aboutSchema = Schema(
  {
    image: {
      type: String,
    },
    title: {
      en: {
        type: String,
      },
      np: {
        type: String,
      },
    },
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

export default aboutSchema;
