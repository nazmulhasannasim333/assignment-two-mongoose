import { TUser } from "./user.interface";
import { User } from "./user.model";

// insert a user to database
const createUserToDB = async (userData: TUser) => {
  const result = User.create(userData);
  return result;
};

// get all users from database
const getAllUserFromDB = async () => {
  const result = User.find();
  return result;
};

// get single user from database
const getSingleUserFromDB = async (userId: number | string) => {
  const result = User.findOne({ userId });
  return result;
};

// update single user from database
const updateUserFromDB = async (userId: number | string, userData: TUser) => {
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
