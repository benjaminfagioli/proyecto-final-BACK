import Jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const signToken = (User) => {
  const token = Jwt.sign(
    {
      id: User._id,
      email: User.email,
      name: User.name,
      role: User.role,
    },
    SECRET
  );
  return token;
};
