import Jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const validateToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }
  try {
    const verified = Jwt.verify(token, SECRET);
    req.userToken = verified;
    if (verified.role !== "admin") {
      return res.status(403).json({
        error:
          "Acceso denegado. Solo los administradores pueden realizar esta acción.",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token inválido." });
  }
};
