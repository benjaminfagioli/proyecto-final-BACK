import { Router } from "express";
import { getAllProducts } from "../controllers/products.controllers.js";
const router = Router();

router.get("/allRooms", getAllProducts);

export default router;
