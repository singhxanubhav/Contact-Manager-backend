import express from "express";
const router = express.Router();
import {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";
import { validateToken } from "../middleware/validateTokenhandler.js";

// route.get("/", getContacts);
// route.post("/", createContact);
// route.get("/:id", getContact);
// route.put("/:id", updateContact);
// route.delete("/:id", deleteContact);

// or
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
