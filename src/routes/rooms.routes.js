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

const router = Router();

router.get("/allRooms", getAllRooms);
router.post("/createRoom", createRoom);
router.delete("/deleteRoom/:id", deleteById);
router.patch("/editRoom/:id", editRoom);
router.get("/search", searchRooms);
router.get("/getById/:id", getById);
router.get("/getByNumber/:number", getByNumber);

// search with options
// search with properties
export default router;

// agregar precio entre 60 y 120
