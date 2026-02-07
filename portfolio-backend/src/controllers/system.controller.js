import { checkReadiness } from "../engines/ready.engine.js";

export async function readiness(req, res) {
  const result = await checkReadiness();

  const statusCode = result.status === "READY" ? 200 : 503;
  res.status(statusCode).json(result);
}


export function health(req, res) {
  res.json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}


export function meta(req, res) {
  res.json({
    service: "portfolio-backend",
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version
  });
}


import { getMetrics } from "../services/metrics.service.js";

export function stats(req, res) {
  res.json({
    status: "UP",
    metrics: getMetrics(),
    timestamp: new Date().toISOString()
  });
}
