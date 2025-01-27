import { Router } from "express";
import {
  loginAdmin,
  createAdmin,
  verifyAdmin,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const adminRoutes = Router();

adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/create", createAdmin);
adminRoutes.get("/verify-user", verifyAdmin);

export default adminRoutes;
