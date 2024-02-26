import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers.js";
const router = Router();

router.get("/allUsers", getAllUsers);

export default router;
