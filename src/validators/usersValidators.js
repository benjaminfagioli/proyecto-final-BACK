import { passwordRegex } from "../helpers/passwordRegex.js";
import { body } from "express-validator";
import User from "../models/user.model.js";
import comparePasswords from "../helpers/comparePasswords.js";

const existsEmail = async (email) => {
  const userFound = await User.findOne({ email: email });
  if (userFound)
    throw new Error(`El email ${email} ya se encuentra registrado`);
  return false;
};

const existsEmailLogin = async (email) => {
  const userFound = await User.findOne({ email: email });
  if (!userFound) throw new Error(`No existe un usuario con el email ${email}`);
  return false;
};
const isActiveEmail = async (email) => {
  const userFound = await User.findOne({ email: email });
  if (!userFound.isActive)
    throw new Error(
      `Tu cuenta se encuentra temporalmente desactivada, contactanos para mas información`
    );
  return false;
};
const checkPassword = async ({ email, password }) => {
  const userFound = await User.findOne({ email: email });
  if (!userFound) return;
  const hashPassword = await comparePasswords(password, userFound.password);
  if (!hashPassword) throw new Error("Contraseña incorrecta");
  return true;
};

export const validateCreateUser = {
  name: body("name").notEmpty().withMessage("Ingresa un nombre"),
  email: body("email")
    .isEmail()
    .withMessage("Ingresa un mail valido")
    .not()
    .isEmpty()
    .withMessage("Ingresa un mail")
    .custom(existsEmail),
  password: body("password")
    .matches(passwordRegex)
    .withMessage(
      "Ingresa una contraseña con mínimo de 8 caracteres, máximo de 30. Debe contener al menos una letra y un número, no se permiten espacios ni caracteres especiales."
    ),
};

export const validateLoginUser = {
  email: body("email")
    .notEmpty()
    .withMessage("Debe ingresar un email")
    .if(body("email").notEmpty())
    .isEmail()
    .withMessage("Debe tener un formato de email")
    .if(body("email").isEmail())
    .custom(existsEmailLogin)
    .if(body("email").isEmail().custom(existsEmailLogin))
    .custom(isActiveEmail),
  password: body("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .if(body("password").notEmpty()),
  body: body()
    .if(body("email").notEmpty().isEmail())
    .if(body("password").notEmpty())
    .custom(checkPassword),
};
