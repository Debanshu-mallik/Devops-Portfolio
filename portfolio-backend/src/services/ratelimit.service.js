const hits = new Map();

export function rateLimit({ windowMs, max }) {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    if (!hits.has(key)) {
      hits.set(key, []);
    }

    const timestamps = hits.get(key).filter(
      t => now - t < windowMs
    );

    timestamps.push(now);
    hits.set(key, timestamps);

    if (timestamps.length > max) {
      return res.status(429).json({
        error: "Too many requests. Please slow down."
      });
    }

    next();
  };
}
