import { ADMIN_KEY, USER_KEY } from "../config/config.js";
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

export const editUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.isActive = isActive;
    await user.save();
    return res.status(200).json({
      message: "Estado de usuario actualizado correctamente",
      user: user,
    });
  } catch (error) {
    console.error("Error al editar estado de usuario:", error);
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
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    const key = user.role === "admin" ? ADMIN_KEY : USER_KEY;
    const token = signToken(user);

    return res.status(200).json({ token: token, key: key });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileWithToken = async (req, res) => {
  try {
    const { userToken } = req;
    res.status(200).json(userToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findById(id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
