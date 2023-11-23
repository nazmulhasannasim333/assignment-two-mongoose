/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
};

export interface UserModel extends Model<TUser> {
  isUserExists(userId: number | string): Promise<TUser> | null;
}
