import express, { Router } from "express";
import {
  listProducts,
  addProduct,
  deleteProduct,
  putProduct,
  getProductById,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", listProducts);

router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", putProduct);
router.get("/:id", getProductById);

export default router;
