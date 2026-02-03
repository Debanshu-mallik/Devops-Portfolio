import { Router } from "express";
import { health, meta } from "../controllers/system.controller.js";
import { stats } from "../controllers/system.controller.js";
import { requireInternalToken } from "../middleware/internalAuth.js";



const router = Router();

router.get("/health", health);
router.get("/meta", meta);
router.get("/stats", requireInternalToken, stats);

export default router;
