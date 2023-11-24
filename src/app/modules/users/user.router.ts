import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

// create user
router.post("/users", userController.createUser);
// get all user
router.get("/users", userController.getAllUser);
// get single user
router.get("/users/:userId", userController.getSingleUser);
// get user order
router.get("/users/:userId/orders", userController.getUserOrder);
// calculate user order price
router.get(
  "/users/:userId/orders/total-price",
  userController.calculateUserOrder
);
// update a user
router.put("/users/:userId", userController.updateUser);
// insert a order to user collection
router.put("/users/:userId/orders", userController.insertOrder);
// delete user
router.delete("/users/:userId", userController.deleteUser);

export const UserRoutes = router;
