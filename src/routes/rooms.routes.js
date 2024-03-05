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

const router = Router();

router.get("/allRooms", validateToken, getAllRooms);
router.post("/createRoom", validateToken, createRoom);
router.delete("/deleteRoom/:id", validateToken, deleteById);
router.patch("/editRoom/:id", validateToken, editRoom);
router.get("/search", searchRooms);
router.get("/getById/:id", getById);
router.get("/getByNumber/:number", getByNumber);

// search with options
// search with properties
export default router;

// agregar precio entre 60 y 120
