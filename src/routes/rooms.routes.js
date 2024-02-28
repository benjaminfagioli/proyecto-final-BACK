import { Router } from "express";
import { createRoom, getAllRooms } from "../controllers/rooms.controllers.js";

const router = Router();

router.get("/allRooms", getAllRooms);
router.post("/createRoom", createRoom);

export default router;
