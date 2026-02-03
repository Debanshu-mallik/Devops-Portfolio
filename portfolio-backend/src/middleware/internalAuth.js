export function requireInternalToken(req, res, next) {
  const token = req.headers["x-internal-token"];

  if (!token || token !== process.env.SYSTEM_STATS_TOKEN) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  next();
}
