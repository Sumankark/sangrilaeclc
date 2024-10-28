import { Schema } from "mongoose";

const addressSchema = Schema(
  {
    address: {
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

export default addressSchema;
