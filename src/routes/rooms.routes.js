import { Router } from "express";
import {
  createRoom,
  deleteById,
  deleteReserve,
  editRoom,
  getAllMyRooms,
  getAllRooms,
  getById,
  getByNumber,
  reserve,
  searchRooms,
} from "../controllers/rooms.controllers.js";
import { validateToken } from "../validators/validateToken.js";
import {
  validateCreateProducts,
  validateReservesProducts,
} from "../validators/productsValidations.js";
import { validateFields } from "../validators/validateFields.js";
import { validateUserToken } from "../validators/validateUserToken.js";

const router = Router();

router.post(
  "/createRoom",
  validateToken,
  [validateCreateProducts.stars],
  [validateCreateProducts.number],
  [validateCreateProducts.properties],
  [validateCreateProducts.reserves],
  [validateCreateProducts.description],
  [validateCreateProducts.isVisible],
  [validateCreateProducts.images],
  validateFields,
  createRoom
);
router.get("/allRooms", validateToken, getAllRooms);
router.delete("/deleteRoom/:id", validateToken, deleteById);
router.patch(
  "/editRoom/:id",
  validateToken,
  [validateCreateProducts.reserves],
  validateFields,
  editRoom
);
router.get("/search", searchRooms);
router.get("/getById/:id", getById);
router.get("/getByNumber/:number", getByNumber);
router.post(
  "/reserve",
  validateUserToken,
  [
    validateReservesProducts.from,
    validateReservesProducts.to,
    validateReservesProducts.room,
    validateReservesProducts.fromTo,
  ],
  validateFields,
  reserve
);
router.get("/getallMyRooms", validateUserToken, getAllMyRooms);
router.patch("/deleteReserve", deleteReserve);

export default router;
