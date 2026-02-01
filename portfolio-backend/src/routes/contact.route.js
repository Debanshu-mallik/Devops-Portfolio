import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { rateLimit } from "../services/ratelimit.service.js";
import { requireFields } from "../services/validate.service.js";


const router = Router();



router.post("/", submitContact);

router.post(
  "/",
  rateLimit({ windowMs: 60_000, max: 10 }),
  requireFields(["email", "message"]),
  submitContact
);



export default router;
