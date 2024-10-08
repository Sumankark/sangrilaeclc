import { Router } from "express";
import {
  addUser,
  createDefaultUser,
  deleteUser,
  getAllUser,
  getProfile,
  Login,
  updatePassword,
  updateUser,
  updateUsername,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isSuperAdmin } from "../middleware/isSuperAdmin.js";

const userRouter = Router();

userRouter.route("/createUser").post(createDefaultUser);
userRouter.route("/login").post(Login);
userRouter.route("/profile").get(isAuthenticated, getProfile);
userRouter.route("/update-username").patch(isAuthenticated, updateUsername);
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);
userRouter.route("/add-user").post(isAuthenticated, isSuperAdmin, addUser);
userRouter.route("/users").get(isAuthenticated, isSuperAdmin, getAllUser);
userRouter.route("/users/:id").patch(isAuthenticated, isSuperAdmin, updateUser);
userRouter
  .route("/users/:id")
  .delete(isAuthenticated, isSuperAdmin, deleteUser);

export default userRouter;
