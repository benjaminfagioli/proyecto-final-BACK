import { Router } from "express";
import { getAllRooms } from "../controllers/rooms.controllers.js";

const router = Router();

router.get("/allRooms", getAllRooms);

export default router;
