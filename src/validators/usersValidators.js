import { passwordRegex } from "../helpers/passwordRegex.js";
import { body } from "express-validator";
import User from "../models/user.model.js";

const existsEmail = async (email) => {
  const userFound = await User.findOne({ email: email });

  if (userFound) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }

  return false;
};

const validateCreateUser = {
  name: body("name").notEmpty().withMessage("Ingresa un nombre"),
  email: body("email")
    .isEmail()
    .withMessage("Ingresa un mail valido")
    .not()
    .isEmpty()
    .withMessage("Ingresa un mail ")
    .custom(existsEmail),
  password: body("password")
    .matches(passwordRegex)
    .withMessage(
      "Ingresa una contraseña con mínimo de 8 caracteres, máximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales."
    ),
};

export default validateCreateUser;
