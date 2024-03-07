import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
  searchUsers,
  login,
} from "../controllers/user.controllers.js";
import validateCreateUser from "../validators/usersValidators.js";
import { validateFields } from "../validators/validateFields.js";
import { validateToken } from "../validators/validateToken.js";

const router = Router();

router.get("/allUsers", validateToken, getAllUsers);
router.post(
  "/createUser",
  [
    validateCreateUser.email,
    validateCreateUser.password,
    validateCreateUser.name,
  ],
  validateFields,
  createUser
);
router.delete("/deleteUser/:id", validateToken, deleteUserById);
router.patch("/editUser/:id", editUser);
router.get("/searchUsers", searchUsers);
router.post("/login", validateFields, login);

export default router;
