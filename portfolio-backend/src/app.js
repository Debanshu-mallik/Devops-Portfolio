import express from "express";

import portfolioRoutes from "./routes/portfolio.route.js";
import intentRoutes from "./routes/intent.route.js";
import contactRoutes from "./routes/contact.route.js";
import systemRoutes from "./routes/system.route.js";
import requestId from "./middleware/requestId.js";

const app = express();

/* ===== Core middleware ===== */


app.use(express.json());
app.use(requestId);



/* ===== Request logging ===== */


import { recordRequest } from "./services/metrics.service.js";
app.use((req, res, next) => {
  recordRequest();
  next();
});


app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(JSON.stringify({
      logType: "REQUEST",
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
      timestamp: new Date().toISOString()
    }));
  });

  next();
});



/* ===== Routes ===== */

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/intent", intentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/system", systemRoutes);

/* ===== Error middleware (LAST) ===== */

app.use((err, req, res, next) => {
  console.error(JSON.stringify({
    logType: "ERROR",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    timestamp: new Date().toISOString()
  }));

  res.status(500).json({ error: "Internal server error" });
});


export default app;