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
