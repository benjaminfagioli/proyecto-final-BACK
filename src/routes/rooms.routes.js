import { Router } from "express";
import {
  createRoom,
  deleteById,
  deleteReserve,
  editRoom,
  getAllMyRooms,
  getAllRooms,
  getDataToSearcher,
  getById,
  getByNumber,
  reserve,
  searchRooms,
  getImagesFromRooms,
  deleteManyReserves,
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
  validateCreateProducts.stars,
  validateCreateProducts.number,
  validateCreateProducts.properties,
  validateCreateProducts.reserves,
  validateCreateProducts.description,
  validateCreateProducts.isVisible,
  validateCreateProducts.images,
  validateCreateProducts.price,
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
router.get("/getDataToSearcher", getDataToSearcher);
router.get("/getImagesFromRooms", getImagesFromRooms);
router.patch("/deleteManyReserves/:id", deleteManyReserves);

export default router;
