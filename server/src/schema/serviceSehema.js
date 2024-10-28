import { Schema } from "mongoose";

const serviceSchema = Schema(
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
    details: [
      {
        type: Schema.Types.ObjectId,
        ref: "ServiceDetail",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default serviceSchema;
