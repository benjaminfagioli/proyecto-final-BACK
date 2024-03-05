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

const router = Router();

router.get("/allUsers", getAllUsers);
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
router.delete("/deleteUser/:id", deleteUserById);
router.patch("/editUser/:id", editUser);
router.get("/searchUsers", searchUsers);
router.post("/login", login);

export default router;
