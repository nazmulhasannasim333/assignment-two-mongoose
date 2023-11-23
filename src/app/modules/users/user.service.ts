import { TUser } from "./user.interface";
import { User } from "./user.model";

// insert a user to database
const createUserToDB = async (userData: TUser) => {
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
  const result = User.findOne({ userId });
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found for this id");
  }
  return result;
};

// update single user from database
const updateUserFromDB = async (userId: number | string, userData: TUser) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found for update");
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
    throw new Error("User not found for delete");
  }
  const result = User.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
