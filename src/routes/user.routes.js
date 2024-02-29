import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
  searchUsers,
} from "../controllers/user.controllers.js";
import validateCreateUser from "../validators/usersValidators.js";

const router = Router();

router.get("/allUsers", getAllUsers);
router.post("/createUser", [validateCreateUser.email], createUser);
router.delete("/deleteUser/:id", deleteUserById);
router.patch("/editUser/:id", editUser);
router.get("/searchUsers", searchUsers);

export default router;
