const metrics = {
  startTime: Date.now(),
  requests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  lastGithubSync: null
};

export function recordRequest() {
  metrics.requests += 1;
}

export function recordCacheHit() {
  metrics.cacheHits += 1;
}

export function recordCacheMiss() {
  metrics.cacheMisses += 1;
}

export function recordGithubSync() {
  metrics.lastGithubSync = new Date().toISOString();
}

export function getMetrics() {
  return {
    uptimeSeconds: Math.floor((Date.now() - metrics.startTime) / 1000),
    requests: metrics.requests,
    cache: {
      hits: metrics.cacheHits,
      misses: metrics.cacheMisses
    },
    lastGithubSync: metrics.lastGithubSync
  };
}
