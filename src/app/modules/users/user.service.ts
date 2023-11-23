import { TUser } from "./user.interface";
import { User } from "./user.model";

// User Related API's
// create a user to database
const createUserToDB = async (userData: TUser) => {
  const userExists = await User.isUserExists(userData.userId);
  if (userExists) {
    throw new Error("User already exists!");
  }
  const result = User.create(userData);
  return result;
};

// get all users from database
const getAllUserFromDB = async () => {
  const result = User.find().select(
    "userId username fullName age email address"
  );
  return result;
};

// get single user from database
const getSingleUserFromDB = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = User.findOne({ userId });
  return result;
};

// update single user from database
const updateUserFromDB = async (userId: number | string, userData: TUser) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = User.findOneAndUpdate(
    { userId },
    {
      $set: userData,
    },
    { new: true, runValidators: true }
  );
  return result;
};

// delete single user from database
const deleteUserFromDB = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = User.findOneAndDelete({ userId });
  return result;
};

// Orders Related API's
// insert a order to specific user collection
const insertOrderToUserCollection = async (
  userId: number | string,
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  }
) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const { productName, price, quantity } = orderData;
  const result = User.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true }
  );
  return result;
};

// get a user all orders
const getAllOrderToUserCollection = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = User.findOne({ userId }).select("orders");
  return result;
};

// calculate a user all orders price
const calculateAllOrderToUserCollection = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = await User.findOne({ userId }).select("orders");

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number }) => {
      return total + (order.price || 0);
    },
    0
  );
  return totalPrice;
};

export const UserServices = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  insertOrderToUserCollection,
  getAllOrderToUserCollection,
  calculateAllOrderToUserCollection,
};
