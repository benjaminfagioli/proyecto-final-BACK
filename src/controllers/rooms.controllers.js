import Rooms from "../models/room.model.js";

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ messagee: error.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const rooms = await Rooms.find(id);

    if (rooms) {
      return res.status(200).json(rooms);
    }

    return res.status(404).json({ message: "habitacion no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const rooms = await Rooms.find(id);

    if (rooms) {
      await Rooms.findByIdAndDelete(id);
      return res.status(204);
    }

    return res.status(404).json({ message: "Habitacion no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  const { number, environment, isBusy, hasPool, userId, isVisible } = req.body;

  try {
    const newRoom = await Rooms.createRoom(
      number,
      environment,
      isBusy,
      hasPool,
      userId,
      isVisible
    );
    res
      .status(201)
      .json({ message: `Habitacion creada con el numero: ${newRoom.number}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
