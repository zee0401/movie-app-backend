import { loginAdmin, createAdmin } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const adminRoutes = Router();

adminRoutes.post("/login", authMiddleware, loginAdmin);
adminRoutes.post("/create", authMiddleware, createAdmin);

export default adminRoutes;
