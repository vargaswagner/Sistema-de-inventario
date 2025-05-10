import express from "express";
import {
  getUsers,
  getUserById,
  deleteUserByID,
} from "../controllers/users/userController.js";

import { validateAccess } from "../middlewares/index.js";

const router = express.Router();

router.get(
  "/",
  [validateAccess.verifyToken, validateAccess.verifyRole(["admin"])],
  getUsers
);
router.get(
  "/:id",
  [validateAccess.verifyToken, validateAccess.verifyRole(["admin"])],
  getUserById
);
router.delete(
  "/:id",
  [validateAccess.verifyToken, validateAccess.verifyRole(["admin"])],
  deleteUserByID
);

export default router;
