import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import Admin from "../models/adminModel.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.userId);

    if (!admin) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized" });
  }
});
