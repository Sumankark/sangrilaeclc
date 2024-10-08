import { Schema } from "mongoose";

const carouselSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "carousel Image field is required"],
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

export default carouselSchema;
