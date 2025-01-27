import Admin from "../models/adminModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    throw new Error("Admin already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    generateToken(res, newAdmin._id);
    await newAdmin.save();

    res.status(201).json({
      _id: newAdmin._id,
      email: newAdmin.email,
      username: newAdmin.name,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Admin not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, admin.password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }

  if (isPasswordCorrect) {
    generateToken(res, admin._id);
    res.status(200).json({
      adminDetails: {
        _id: admin._id,
        email: admin.email,
      },
    });
  } else {
    res.status(401).json({ error: "Incorrect password" });
  }
});

export const verifyAdmin = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("decodedToken", decodedToken);

    const admin = await Admin.findOne(decodedToken.admin);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Token verified successfully", admin });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token or token expired" });
  }
});
