import { passwordRegex } from "../helpers/passwordRegex.js";
import { body } from "express-validator";

const existsEmail = async (email) => {
  const userFound = await User.findOne({ email: email });

  if (userFound) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }

  return false;
};

const validateCreateUser = {
  email: body("email")
    .isEmail()
    .withMessage("Ingrersa un mail valido")
    .not()
    .isEmpty()
    .withMessage("Ingrersa un mail ")
    .custom(existsEmail),
  password: body("password")
    .matches(passwordRegex)
    .withMessage(
      "Ingresa una contraseña con minimo de 8 caracteres, maximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales. "
    ),
};

export default validateCreateUser;
