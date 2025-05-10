import express from "express";
import {
  getSuppliers,
  createSupplier,
  pathSupplier,
  deleteSupplierByID,
} from "../controllers/suppliers/supplierController.js";

import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  getSuppliers
);
router.post(
  "/",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  createSupplier
);
router.patch(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  pathSupplier
);
router.delete(
  "/:id",
  [
    validateAccess.verifyToken,
    validateAccess.verifyRole(["admin", "almacenero"]),
  ],
  deleteSupplierByID
);

export default router;
