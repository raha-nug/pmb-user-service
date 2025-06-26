import express from "express";

const router = express.Router();

// Import user controller functions
import * as userController from "../http/userController.js";
import { authenticateToken } from "../http/middlewares/authenticate.js";
import validate from "../http/middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
} from "../http/middlewares/userSchemas.js";
// Define routes for user operations
router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Profile Berhasil Diakses" });
});

export default router;
