import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUser);
router.get("/users/:userId", userController.getSingleUser);
router.put("/users/:userId", userController.updateUser);
router.put("/users/:userId/orders", userController.insertOrder);
router.delete("/users/:userId", userController.deleteUser);

export const UserRoutes = router;
