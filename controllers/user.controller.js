import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  // Create the new user and await the result
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User Created: ${user}`);

  // If user is successfully created, return user info
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    // If user creation fails, throw an error
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find the user by email
  const user = await User.findOne({ email });

  // Compare the provided password with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate access token
    const accessToken = Jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT, // Correct the typo
      { expiresIn: "5m" } // Token expires in 2 minutes
    );

    // Send the access token in response
    res.status(200).json({ accessToken });
  } else {
    // If user is not found or password is incorrect
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// Access Private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
