import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";
import roleMiddleware from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllProducts);
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), getProductById);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createProduct);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteProduct);

export default router;
