import { Schema } from "mongoose";

const serviceDetailSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "image field is required."],
    },
    title: {
      en: {
        type: String,
        required: [true, "en title field is required."],
      },
      np: {
        type: String,
        required: [true, "np title field is required."],
      },
    },
    content: {
      en: {
        type: String,
        required: [true, "en content field is required."],
      },
      np: {
        type: String,
        required: [true, "np content field is required."],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default serviceDetailSchema;
