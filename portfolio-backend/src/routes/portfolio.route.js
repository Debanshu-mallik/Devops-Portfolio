import { Router } from "express";
import { getPortfolio } from "../controllers/portfolio.controller.js";
import { rateLimit } from "../services/ratelimit.service.js";

const router = Router();



router.get("/", getPortfolio);

router.get(
  "/",
  rateLimit({ windowMs: 60_000, max: 30 }),
  getPortfolio
);



export default router;
