import { body, param } from "express-validator";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import regexImage from "../helpers/regexImage.js";
import { isValidObjectId } from "mongoose";
import {
  addDays,
  differenceInCalendarDays,
  areIntervalsOverlapping,
} from "date-fns";

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

const validateReserves = async (reserves) => {
  reserves.forEach(({ userId, from, to }) => {
    if (!isValidObjectId(userId)) {
      throw new Error(
        "Las reservas deben contener un ObjectId asociado a la misma"
      );
    }
    if (from == undefined) {
      throw new Error("Las reservas deben tener una fecha de inicio");
    } else {
      if (!Boolean(Date.parse(from)))
        throw new Error("From debe ser una fecha");
    }
    if (to == undefined) {
      throw new Error("Las reservas deben tener una fecha límite");
    } else {
      if (!Boolean(Date.parse(to))) throw new Error("To debe ser una fecha");
    }
  });

  return true;
};

const validateIds = async (reserves) => {
  const ids = reserves.map((r) => r.userId);
  const usersFound = await User.find({
    _id: ids,
  });
  // 65ebc5aa61eb8126f5717f79
  // 65e61bdfac2944ca4c8a8cdb
  console.log(usersFound);
  if (usersFound.length < ids.length)
    throw new Error(
      "El id de uno o mas usuarios no se encuentran registrados en nuestra base de datos  "
    );
  return true;
};

const existsNumberRoom = async (number) => {
  const roomFound = await Room.findOne({ number: number });
  if (roomFound)
    throw new Error(`Ya existe una habitacion con el número ${number}`);
};

const existsNumberRoomReserve = async (number) => {
  const roomFound = await Room.findOne({ number: number });
  if (!roomFound) throw new Error(`No se encontró la habitacion n°${number}`);
};

const validateImages = (images) => {
  if (images.length === 0) {
    throw new Error("Debe ingresar al menos una imagen");
  }
  let incompatibles = images.filter((image) => !regexImage.test(image));
  if (incompatibles.length > 0) {
    throw new Error(
      `${incompatibles.join(", ")} no son compatibles como formato de imagen`
    );
  }
  return true;
};

const validateDate = (date) => {
  return !!Date.parse(date);
};

const verifyReserves = async (body) => {
  const { from, to, room } = body;
  let interval = { start: new Date(from), end: new Date(to) };

  const roomFounded = await Room.findOne({ number: room });
  const { reserves } = roomFounded;

  let errors = [];

  reserves.forEach((reserve) => {
    let reserveInterval = {
      start: new Date(reserve.from),
      end: new Date(reserve.to),
    };
    if (areIntervalsOverlapping(reserveInterval, interval))
      errors.push(
        `El intervalo ${reserveInterval.start.toLocaleDateString()} a ${reserveInterval.end.toLocaleDateString()} se está superponiendo con la fecha solicitada`
      );
  });
  if (errors.length > 0) throw new Error(errors.join(", "));

  return true;
};

const verifyHaveReserves = async (id) => {
  const reserves = await Room.findOne({ "reserves.userId": id });
  console.log(reserves);
  if (!reserves) throw new Error("No se encontraron reservas");
};

export const validateCreateProducts = {
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
    .if(body("images").isArray()),

  reserves: body("reserves")
    .isArray()
    .withMessage("Reserves debe ser un array")
    .custom(validateReserves)
    .if(body("reserves").custom(validateReserves))
    .custom(validateIds),
  price: body("price")
    .notEmpty()
    .withMessage("Debe ingresar un precio")
    .if(body("price").notEmpty())
    .isInt({ min: 1, max: 10_000_000 })
    .withMessage(
      "El precio debe ser un numero y estar comprendido entre 1 y 10.000.000"
    ),
};

export const validateReservesProducts = {
  from: body("from")
    .notEmpty()
    .withMessage("Las reservas deben tener una fecha de inicio")
    .custom(validateDate)
    .withMessage("La fecha de inicio debe tener un formato de fecha"),

  to: body("to")
    .notEmpty()
    .withMessage("Las reservas deben tener una fecha de fin")
    .custom(validateDate)
    .withMessage("La fecha final debe tener un formato de fecha"),
  room: body("room")
    .notEmpty()
    .withMessage("Para realizar una reserva se debe especificar la habitación")
    .isInt({ gt: 0 })
    .withMessage("Debe tener un formato de número y ser mayor a 0")
    .if(body("room").isInt({ gt: 0 }))
    .custom(existsNumberRoomReserve),
  fromTo: body().custom(verifyReserves),
};

export const validateDeleteReserve = {
  id: param("id").custom(verifyHaveReserves),
};
