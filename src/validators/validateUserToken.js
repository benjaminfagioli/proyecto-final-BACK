import Jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const validateUserToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }
  try {
    const verified = Jwt.verify(token, SECRET);
    req.userToken = verified;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
