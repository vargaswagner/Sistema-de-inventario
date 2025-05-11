import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  pathProduct,
  deleteProductByID,
} from "../controllers/products/productController.js";

import { createEntranceProduct } from "../controllers/products/entranceController.js";
import { createExitProduct } from "../controllers/products/exitController.js";
import getLowStockAlerts from "../controllers/products/alertControllers.js";

import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/low-stock",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  getLowStockAlerts
);

router.get(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero", "vendedor"]),
  ],
  getProducts
);
router.get(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero", "vendedor"]),
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

// Movimiento del Producto
router.post(
  "/product-entrance",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  createEntranceProduct
);

router.post(
  "/product-exits",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "vendedor"]),
  ],
  createExitProduct
);

export default router;
