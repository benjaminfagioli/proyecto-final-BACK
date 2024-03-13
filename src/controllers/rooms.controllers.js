import Rooms from "../models/room.model.js";
import cadenaABooleano from "../utils/cadenaABooleano.js";

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Rooms.findById(id);

    if (rooms) {
      return res.status(200).json(rooms);
    }

    return res.status(404).json({ message: "Habitacion no encontrada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Rooms.findById(id);
    if (rooms) {
      await Rooms.findByIdAndDelete(id);
      return res.status(200).json({
        message: `Habitacion ${rooms.number} eliminada con éxito`,
        id: id,
      });
    }

    return res.status(404).json({ message: "Habitacion no encontrada" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  const {
    number,
    stars,
    isBusy,
    description,
    userId,
    isVisible,
    images,
    properties,
  } = req.body;

  try {
    const newRoom = await Rooms.create({
      number: number,
      stars: stars,
      isBusy: isBusy,
      description: description,
      userId: userId,
      isVisible: isVisible,
      images: images,
      properties: properties,
    });
    res.status(201).json({ message: newRoom._id });
  } catch (error) {
    console.error("Room Creation Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const editRoom = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    let room = await Rooms.findById(id);
    if (!room)
      return res.status(404).json({ message: "Producto no encontrado" });
    await Rooms.findByIdAndUpdate(id, body);
    for (const key in body) {
      const element = body[key];
      room[key] = element;
    }
    return res.status(200).json({
      message: "Editado Correctamente",
      room: room,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const searchRooms = async (req, res) => {
  const {
    stars,
    bedrooms,
    bathrooms,
    floor,
    wifi,
    airConditioner,
    lowerPrice,
    highestPrice,
  } = req.query;
  const payload = {};
  let properties = [];
  let assign = { isVisible: true };
  if (lowerPrice) {
    assign.price = { $gte: Number(lowerPrice) };
  }
  if (highestPrice) {
    assign.price = { ...assign.price, $lte: Number(highestPrice) };
  }
  if (stars) {
    assign.stars = stars;
  }
  if (bedrooms || bathrooms || floor || wifi || airConditioner) {
    payload.properties = {};
  }
  if (bathrooms) {
    payload.properties.bathrooms = bathrooms;
  }
  if (bedrooms) {
    payload.properties.bedrooms = bedrooms;
  }
  if (floor) {
    payload.properties.floor = floor;
  }
  if (wifi) {
    payload.properties.wifi = wifi;
  }
  if (airConditioner) {
    payload.properties.airConditional = airConditioner;
  }
  try {
    for (const key in payload.properties) {
      const element = payload.properties[key];
      let queryString = `properties.${[key]}`;
      properties.push({
        [queryString]: isNaN(element)
          ? cadenaABooleano(element)
          : parseInt(element),
      });
    }
    delete payload.properties;
    properties.forEach((p) => Object.assign(assign, p));
    console.log(assign);

    const results = await Rooms.find(assign);
    if (!results.length)
      return res
        .status(404)
        .json({ message: "No se encontraron habitaciones" });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getByNumber = async (req, res) => {
  const { number } = req.params;
  try {
    const result = await Rooms.findOne({ number: number });
    if (!result)
      return res.status(404).json({ message: "No se encontró la habitación" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const reserve = async (req, res) => {
  const { userToken } = req;
  const { from, to, room } = req.body;
  try {
    const payload = {
      userId: userToken.id,
      from: from,
      to: to,
    };
    await Rooms.findOneAndUpdate(
      { number: room },
      { $push: { reserves: payload } }
    );
    res.status(200).json("Reservado correctamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMyRooms = async (req, res) => {
  try {
    const { userToken } = req;

    const roomsFounded = await Rooms.find({
      "reserves.userId": userToken.id,
    });

    if (!roomsFounded.length)
      return res
        .status(404)
        .json({ message: "No tienes habitaciones reservadas" });

    res.status(200).json(roomsFounded);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReserve = async (req, res) => {
  const { from, to, userId, room } = req.body;
  const payload = {
    from: from,
    to: to,
    userId: userId,
  };
  try {
    const roomFound = await Rooms.findOneAndUpdate(
      {
        number: room,
      },
      { $pull: { reserves: payload } }
    );
    // if (!roomFound) return res.status(404).json("No se encontró la habitacion");
    res.status(200).json(roomFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
