import express from "express";
import home from "../controllers/home.js";
import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/home",
  [validateAccess.verifyToken, validateAccess.verifyRole(["admin"])],
  home
);

export default router;
