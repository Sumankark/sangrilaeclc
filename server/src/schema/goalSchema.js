import { Schema } from "mongoose";

const goalSchema = Schema(
  {
    image: {
      type: String,
      required: [true, "goal image field is required."],
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
    description: {
      en: {
        type: String,
        required: [true, "en description field is required."],
      },
      np: {
        type: String,
        required: [true, "np description field is required."],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default goalSchema;
