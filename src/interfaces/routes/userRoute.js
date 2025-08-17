import express from "express";

const router = express.Router();

// Import user controller functions
import * as userController from "../http/userController.js";
import {
  authenticateToken,
  isAdmin,
} from "../http/middlewares/authenticate.js";
import validate from "../http/middlewares/validate.js";
import { registerSchema } from "../http/middlewares/userSchemas.js";

// Define routes for user operations
router.get("/", authenticateToken, isAdmin, userController.getAllUsers);
router.get("/:userId", authenticateToken, isAdmin, userController.getUserById);
router.post(
  "/",
  authenticateToken,
  isAdmin,
  validate(registerSchema),
  userController.register
);
router.put("/:userId", authenticateToken, isAdmin, userController.updateUser);
router.delete(
  "/:userId",
  authenticateToken,
  isAdmin,
  userController.deleteUser
);


router.delete(
  "seed-admin",
  userController.seedAdmin
);

export default router;
