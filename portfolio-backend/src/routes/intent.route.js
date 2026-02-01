import { Router } from "express";
import { captureIntent } from "../controllers/intent.controller.js";
import { rateLimit } from "../services/ratelimit.service.js";
import { requireFields } from "../services/validate.service.js";

const router = Router();



router.post("/", captureIntent);

router.post(
  "/",
  rateLimit({ windowMs: 60_000, max: 60 }),
  requireFields(["event"]),
  captureIntent
);



export default router;
