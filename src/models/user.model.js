import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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

newUser.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default model("User", newUser);
