import { signToken } from "../helpers/singToken.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      isActive: true,
    });

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      await User.findByIdAndDelete(id);
      return res.status(200).json({
        message: `Usuario ${user.name} eliminado con éxito`,
        id: id,
      });
    }

    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    await User.findByIdAndUpdate(id, body);
    for (const key in body) {
      const element = body[key];
      user[key] = element;
    }
    return res.status(200).json({
      message: "Usuario editado correctamente",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { name } = req.query;
  try {
    const results = await User.find({ name: name });
    if (!results.length)
      return res.status(404).json({ message: "No se encontraron usuarios" });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, name, role } = req.body;
  const { userToken } = req;
  console.log(userToken);
  const user = await User.findOne({ email: email, name: name, role: role });
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }
  const token = signToken(user);
  return res.status(200).json({ token: token });
};
