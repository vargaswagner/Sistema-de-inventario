import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategoryByID,
} from "../controllers/categories/categoryController.js";

import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  getCategories
);
router.post(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  createCategory
);
router.put(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  updateCategory
);
router.delete(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  deleteCategoryByID
);

export default router;
