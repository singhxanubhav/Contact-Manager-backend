import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { validateToken } from "../middleware/validateTokenhandler.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

export default router;
