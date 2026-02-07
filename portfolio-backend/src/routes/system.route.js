import { Router } from "express";
import { health, meta } from "../controllers/system.controller.js";
import { stats } from "../controllers/system.controller.js";
import { requireInternalToken } from "../middleware/internalAuth.js";
import { readiness } from "../controllers/system.controller.js";



const router = Router();

router.get("/health", health);
router.get("/ready", readiness);
router.get("/meta", meta);
router.get("/stats", requireInternalToken, stats);

export default router;
