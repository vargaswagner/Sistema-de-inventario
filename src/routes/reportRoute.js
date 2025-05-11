import express from "express";
import { generateInventoryPDF } from "../controllers/reporte/pdfController.js";
import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/export-inventory",
  //   [
  //     validateAccess.verifyToken,
  //     validateAccess.verifyRole(["admin, almacenero"]),
  //   ],
  generateInventoryPDF
);

export default router;
