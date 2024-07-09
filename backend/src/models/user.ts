import mongoose from "mongoose";

enum UserType {
  Admin = "admin",
  Manager = "manager",
  User = "user",
}

const User = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(UserType),
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    approved: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", User, "users");
