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

export default goalSchema;
