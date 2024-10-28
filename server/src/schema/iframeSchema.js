import { Schema } from "mongoose";

const iframeSchema = Schema(
  {
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default iframeSchema;
