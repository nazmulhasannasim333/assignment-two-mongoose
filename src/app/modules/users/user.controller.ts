import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { UserZodSchema } from "./user.validation";

// User Related API's
// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // zod validation data
    const zodParseData = UserZodSchema.UserValidationSchema.parse(userData);
    const result = await UserServices.createUserToDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User create failed!",
      error: {
        code: 500,
        description: "User create failed!",
        error: error,
      },
    });
  }
};

// get all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// update single user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const zodParseDataForUpdate =
      UserZodSchema.UserValidationSchema.parse(userData);
    const result = await UserServices.updateUserFromDB(
      userId,
      zodParseDataForUpdate
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// delete single user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// insert a order
const insertOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;
    const zodOrderParse = UserZodSchema.orderSchema.parse(order);
    const result = await UserServices.insertOrderToUserCollection(
      userId,
      zodOrderParse
    );
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// get a user order
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrderToUserCollection(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

// calculate a user order
const calculateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalPrice =
      await UserServices.calculateAllOrderToUserCollection(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not found",
      error: {
        code: 404,
        description: "User not found!",
        error: error,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  insertOrder,
  getUserOrder,
  calculateUserOrder,
};
