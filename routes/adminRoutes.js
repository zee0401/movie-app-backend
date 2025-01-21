import { Router } from "express";
import { loginAdmin, createAdmin } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const adminRoutes = Router();

adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/create", createAdmin);

export default adminRoutes;
