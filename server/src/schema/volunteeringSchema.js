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
        required: [true, "en title is required."],
      },
      np: {
        type: String,
        required: [true, "np title is required."],
      },
    },
    description: {
      en: {
        type: String,
        required: [true, "en description is required."],
      },
      np: {
        type: String,
        required: [true, "np description is required."],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default volunteeringSchema;
