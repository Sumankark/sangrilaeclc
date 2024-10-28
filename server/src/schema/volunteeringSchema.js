import { Schema } from "mongoose";

const volunteeringSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "image field is required."],
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

export default volunteeringSchema;
