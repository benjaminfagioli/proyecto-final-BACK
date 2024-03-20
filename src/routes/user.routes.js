import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  editUserStatus,
  searchUsers,
  login,
  getProfileWithToken,
} from "../controllers/user.controllers.js";
import {
  validateCreateUser,
  validateLoginUser,
} from "../validators/usersValidators.js";
import { validateFields } from "../validators/validateFields.js";
import { validateToken } from "../validators/validateToken.js";
import { validateUserToken } from "../validators/validateUserToken.js";

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

router.delete("/deleteUser/:id", validateToken, deleteUserById);
router.patch("/editUserStatus/:userId", validateToken, editUserStatus);
router.get("/searchUsers", searchUsers);
router.post(
  "/login",
  [validateLoginUser.email],
  [validateLoginUser.password],
  [validateLoginUser.body],
  validateFields,
  login
);

router.get("/profile", validateUserToken, getProfileWithToken);

export default router;
