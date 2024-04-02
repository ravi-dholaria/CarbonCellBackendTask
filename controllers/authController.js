import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import blacklist from "../data/blacklistedToken.js";

export const registerController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Basic validation
    if (!userName) return res.status(400).json({ error: "email is Required!" });
    if (!password)
      return res.status(400).json({ error: "password is Required!" });

    // Check if user already exists
    const userExists = await userModel.findOne({ userName });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    // Create User
    const user = await userModel.create({
      userName,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Basic validation
    if (!userName) return res.status(400).json({ error: "email is Required!" });
    if (!password)
      return res.status(400).json({ error: "password is Required!" });

    // Check if user already exists
    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Compare Password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Create Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    //blacklist token
    blacklist.add(req.headers.authorization.split(" ")[1]);
    console.log(blacklist);

    res.status(200).json({
      message: "Logout Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
