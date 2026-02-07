import config from "../config/index.js";

export async function checkReadiness() {
  const checks = {
    github: true,
    cache: true,
  };

  // GitHub dependency check (config-level)
  if (!config.github.username) {
    checks.github = false;
  }

  // Cache check (simple sanity)
  if (!config.cache.ttl || config.cache.ttl <= 0) {
    checks.cache = false;
  }

  const ready = Object.values(checks).every(Boolean);

  return {
    status: ready ? "READY" : "NOT_READY",
    checks,
    timestamp: new Date().toISOString(),
  };
}