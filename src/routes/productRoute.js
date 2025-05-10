import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  pathProduct,
  deleteProductByID,
} from "../controllers/products/productController.js";

import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  getProducts
);
router.get(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  getProductById
);
router.post(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  createProduct
);
router.patch(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  pathProduct
);
router.delete(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  deleteProductByID
);

export default router;
