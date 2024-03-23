import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
// @desc Auth user and get token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  // ...
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // verify name
  if (name.length < 3) {
    res.status(400);
    throw new Error("Name must be at least 3 characters");
  }
  // verify email
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email");
  }
  // verify password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = {
    // @ts-ignore
    _id: req.user._id,
    // @ts-ignore
    name: req.user.name,
    // @ts-ignore
    email: req.user.email,
  };
  res.status(200).json(user);
});
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const { name, email, password } = req.body;

  if (name) {
    // verify name
    if (name.length < 3) {
      res.status(400);
      throw new Error("Name must be at least 3 characters");
    }
    user.name = name;
  }
  if (email) {
    // verify email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error("Invalid email");
    }
    user.email = email;
  }
  if (password) {
    // verify password
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
