import { Router } from "express";
import {
  createRoom,
  deleteById,
  editRoom,
  getAllRooms,
  getById,
  getByNumber,
  searchRooms,
} from "../controllers/rooms.controllers.js";
import { validateToken } from "../validators/validateToken.js";
import validateCreateProducts from "../validators/productsValidations.js";
import { validateFields } from "../validators/validateFields.js";

const router = Router();

router.post(
  "/createRoom",
  validateToken,
  [validateCreateProducts.stars],
  [validateCreateProducts.number],
  [validateCreateProducts.properties],
  [validateCreateProducts.hasOwner],
  [validateCreateProducts.isBusy],
  [validateCreateProducts.description],
  [validateCreateProducts.isVisible],
  [validateCreateProducts.images],
  validateFields,
  createRoom
);
router.get("/allRooms", validateToken, getAllRooms);
router.delete("/deleteRoom/:id", validateToken, deleteById);
router.patch("/editRoom/:id", validateToken, editRoom);
router.get("/search", searchRooms);
router.get("/getById/:id", getById);
router.get("/getByNumber/:number", getByNumber);

// search with options
// search with properties
export default router;

// agregar precio entre 60 y 120
