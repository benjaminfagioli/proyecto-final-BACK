import { body } from "express-validator";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import regexImage from "../helpers/regexImage.js";

const validateProperties = (properties) => {
  const { bedrooms, bathrooms, m2, wifi, airConditional } = properties;
  if (
    bedrooms == undefined ||
    bathrooms == undefined ||
    m2 == undefined ||
    wifi == undefined ||
    airConditional == undefined
  )
    throw new Error(
      "Las propiedades deben incluir: Dormitorios, baños, metros cuadrados, wifi y aire acondicionado"
    );
  if (isNaN(bedrooms) || isNaN(bathrooms) || isNaN(m2))
    throw new Error(
      "Las habitaciones, los baños y los metros cuadrados deben ser números"
    );
  if (typeof wifi != "boolean" || typeof airConditional != "boolean")
    throw new Error(
      "Wifi y aire acondicionado deben ser valores tipo booleanos"
    );
  return true;
};

const validateEmailOwner = async (hasOwner) => {
  if (hasOwner[0] === false) return true;
  const { id } = hasOwner;
  if (!id) throw new Error("Debe ingresar el ID del usuario inquilino");
  const userFound = await User.findById(id.trim());
  if (!userFound)
    throw new Error("No se pudo encontrar un usuario con el ID solicitado");
};

const validateDates = (isbusy) => {
  if (isbusy === false) return true;
  const { from, to } = isbusy;
  if (from == undefined || to == undefined)
    throw new Error(
      "Se debe ingresar una fecha de inicio y una limite en forma de objeto"
    );
  if (!Boolean(Date.parse(from)) || !Boolean(Date.parse(to)))
    throw new Error("From y To deben tener formato de fecha");
  return true;
};

const existsNumberRoom = async (number) => {
  const roomFound = await Room.findOne({ number: number });
  if (roomFound)
    throw new Error(`Ya existe una habitacion con el número ${number}`);
};

const validateImages = (images) => {
  if (images.length == 0) throw new Error("Debe ingresar al menos una imagen");
  let incompatibles = [];
  images.forEach((i) => {
    if (!regexImage.test(i)) incompatibles.push(i);
  });
  if (incompatibles.length > 0)
    throw new Error(
      `${incompatibles.join(", ")} no son compatibles como formato de imagen`
    );
  return true;
};

const validateCreateProducts = {
  number: body("number")
    .trim()
    .notEmpty()
    .withMessage("Ingrese un número de habitacion")
    .isInt()
    .withMessage("Debe ser un número")
    .if(body("number").notEmpty().isInt())
    .custom(existsNumberRoom),

  stars: body("stars")
    .notEmpty()
    .withMessage(
      "Ingrese un tipo de habitacion, siendo 1: Basica, 2: Media, 3: Premium"
    )
    .if(body("stars").notEmpty())
    .isInt({ min: 1, max: 3 })
    .withMessage("Por favor ingrese un número del 1 al 3"),

  properties: body("properties")
    .notEmpty()
    .withMessage("Ingrese las propiedades de la habitacion")
    .if(body("properties").notEmpty())
    .custom(validateProperties),

  hasOwner: body("hasOwner")
    .isObject()
    .withMessage("hasOwner debe ser un objeto")
    .if(body("hasOwner").notEmpty().isObject())
    .custom(validateEmailOwner),

  isBusy: body("isBusy").if(body("isBusy").notEmpty()).custom(validateDates),

  description: body("description")
    .notEmpty()
    .withMessage("La habitacion debe tener una descripcion")
    .if(body("description").notEmpty())
    .isString()
    .withMessage("Debe ser en formato texto")
    .if(body("description").isString())
    .isLength({ min: 10, max: 800 })
    .withMessage("Debe tener entre 10 y 800 caracteres"),

  isVisible: body("isVisible")
    .isBoolean({ strict: true })
    .withMessage("isVisible debe ser true o false"),

  images: body("images")
    .notEmpty()
    .withMessage("Debe ingresar imagenes para la habitacion")
    .if(body("images").notEmpty())
    .isArray()

    .withMessage("images debe tener un formato array")
    .if(body("images").isArray())
    .custom(validateImages),
};

export default validateCreateProducts;
