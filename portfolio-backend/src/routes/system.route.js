import { Router } from "express";
import { health, meta } from "../controllers/system.controller.js";
import { stats } from "../controllers/system.controller.js";



const router = Router();

router.get("/health", health);
router.get("/meta", meta);
router.get("/stats", stats);

export default router;
