import express, { Router } from "express";
import {
  listCategories,
  addCategorie,
  deleteCategorie,
  putCategorie,
  getCategorieById,
} from "../controllers/category.controllers.js";

const router = express.Router();

router.get("/", listCategories);

router.post("/", addCategorie);
router.delete("/:id", deleteCategorie);
router.put("/:id", putCategorie);
router.get("/:id", getCategorieById);

export default router;
