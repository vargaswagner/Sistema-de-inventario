import express from "express";

import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/authController.js";
import { validateAccess, validateRegister } from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/register",
  [
    validateAccess.verifyToken,
    validateRegister.checkDuplicateUsernameOrEmail,
    validateAccess.verifyRole(["admin"]),
  ],
  register
);
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
