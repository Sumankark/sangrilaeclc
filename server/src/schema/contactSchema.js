import { Schema } from "mongoose";

const contactSchema = Schema(
  {
    phoneNumber: {
      en: {
        type: String,
      },
      np: {
        type: String,
      },
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default contactSchema;
