import crypto from "crypto";

export default function requestId(req, res, next) {
  const rawId = crypto.randomUUID();
  const requestId = `req-${rawId.slice(0, 8)}`;

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;

    console.log(
      `[${requestId}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${durationMs.toFixed(2)}ms)`
    );
  });

  next();
}