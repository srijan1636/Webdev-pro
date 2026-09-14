import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  email: string;
  hashedPassword: string;
  name?: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
