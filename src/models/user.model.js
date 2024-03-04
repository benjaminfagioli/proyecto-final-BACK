import { Schema, model } from "mongoose";

const newUser = new Schema(
  {
    name: String,
    email: String,
    password: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", newUser);
