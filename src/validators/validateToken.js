import Jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const validateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const verified = Jwt.verify(token, SECRET);
    req.userToken = verified;
    next();
  } catch (error) {
    console.error("Error al validar el token:", error);
    return res.status(400).json({ error: "Token invalido" });
  }
};
