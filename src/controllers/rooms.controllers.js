import Rooms from "../models/room.model.js";

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
  const { number, stars, isBusy, description, userId, isVisible, images } =
    req.body;

  try {
    const newRoom = await Rooms.create({
      number: number,
      stars: stars,
      isBusy: isBusy,
      description: description,
      userId: userId,
      isVisible: isVisible,
      images: images,
    });
    res.status(201).json({ message: newRoom._id });
  } catch (error) {
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

export const searchRooms = async (req, res) => {};
