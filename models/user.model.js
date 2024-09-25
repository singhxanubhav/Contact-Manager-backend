import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "email allready exist"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
